import { HttpClient } from '@angular/common/http';
import { Component, AfterViewInit, OnInit, Renderer2 } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-mahasiswa',
  templateUrl: './mahasiswa.component.html',
  styleUrl: './mahasiswa.component.css',
})
export class MahasiswaComponent implements OnInit, AfterViewInit {
  data: any;
  table1: any;

  constructor(private http: HttpClient, private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.removeClass(document.body, 'sidebar-open');
    this.renderer.addClass(document.body, 'sidebar-closed');
    this.table1 = $('#table1').DataTable();
    this.bind_mahasiswa();
  }
  ngOnInit(): void {}

  bind_mahasiswa(): void {
    this.http
      .get('https://stmikpontianak.net/011100862/tampilMahasiswa.php')
      .subscribe((data: any) => {
        console.log(data);

        this.table1.clear();

        data.forEach((element: any) => {
          let tempatTanggalLahir =
            element.TempatLahir + ', ' + element.TanggalLahir;

          let row = [
            element.NIM,
            element.Nama,
            element.JenisKelamin,
            tempatTanggalLahir,
            element.JP,
            element.Alamat,
            element.StatusNikah,
            element.TahunMasuk,
          ];
          this.table1.row.add(row);
        });
        this.table1.draw(false);
      });
  }

  showTambahModal(): void {
    $('#tambahModal').modal();
  }

  postRecord(): void {
    var alamat = $('#alamatText').val();
    var jenisKelamin = $('#JenisKelaminSelect').val();
    var jp = $('#jpSelect').val();
    var nama = $('#namaText').val();
    var nim = $('#nimText').val();
    var statusNikah = $('#statusNikahSelect').val();
    var tahunMasuk = $('#tahunMasukText').val();
    var tanggalLahir = $('#TanggalLahirText').val();
    var tempatLahir = $('#TempatLahirText').val();

    if (nim.length == 0) {
      alert('NIM beluum diisi');
      return;
    }

    if (nama.length == 0) {
      alert('Nama beluum diisi');
      return;
    }

    if (tempatLahir.length == 0) {
      alert('Tempat lahir beluum diisi');
      return;
    }

    if (tanggalLahir.length == 0) {
      alert('Tanggal lahir beluum diisi');
      return;
    }

    if (alamat.length == 0) {
      alert('Alamat beluum diisi');
      return;
    }

    if (tahunMasuk.length == 0) {
      alert('Tahun masuk beluum diisi');
      return;
    }

    alamat = encodeURIComponent(alamat);
    jenisKelamin = encodeURIComponent(jenisKelamin);
    jp = encodeURIComponent(jp);
    nama = encodeURIComponent(nama);
    nim = encodeURIComponent(nim);
    statusNikah = encodeURIComponent(statusNikah);
    tahunMasuk = encodeURIComponent(tahunMasuk);
    tanggalLahir = encodeURIComponent(tanggalLahir);
    tempatLahir = encodeURIComponent(tempatLahir);

    var url =
      'https://stmikpontianak.net/011100862/tambahMahasiswa.php' +
      '?alamat=' +
      alamat +
      '&jenisKelamin=' +
      jenisKelamin +
      '&jp=' +
      jp +
      '&nama=' +
      nama +
      '&nim=' +
      nim +
      '&statusPernikahan=' +
      statusNikah +
      '&tahunMasuk=' +
      tahunMasuk +
      '&tanggalLahir=' +
      tanggalLahir +
      '&tempatLahir=' +
      tempatLahir;

    this.http.get(url).subscribe((data: any) => {
      console.log(data);
      alert(data.status + ' --> ' + data.message);

      this.bind_mahasiswa();
      $('#tambahModal').modal('hide');
    });
  }
}