import { CommonModule } from '@angular/common';
import { formatCurrency } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';

declare const $: any;

@Component({
  selector: 'app-forex',
  templateUrl: './forex.component.html',
  styleUrl: './forex.component.css',
})
export class ForexComponent implements OnInit, AfterViewInit {
  private _table1: any;

  constructor(private renderer: Renderer2, private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.renderer.removeClass(document.body, 'sidebar-open');
    this.renderer.addClass(document.body, 'sidebar-closed');

    this._table1 = $('#table1').DataTable({
      columnDefs: [
        {
          targets: 2,
          className: 'text-right',
        },
      ],
    });
    this.getData();
  }
  ngOnInit(): void {}
  getData(): void {
    console.log('generate()');

    var url =
      'https://openexchangerates.org/api/latest.json?app_id=2c5f882c125d423d98884c8bea1fe946';

    this.http.get(url).subscribe((data: any) => {
      console.log(data);

      var rates = data.rates;
      console.log(rates);

      var idr = rates.IDR;
      var idr2 = formatCurrency(idr, 'en-US', '', 'USD');
      console.log('USD : ' + idr2);
      var row = [1, 'USD', idr2];
      this._table1.row.add(row);

      var sgd = rates.IDR / rates.SGD;
      var sgd2 = formatCurrency(sgd, 'en-US', '', 'SGD');
      console.log('SGD : ' + sgd2);
      row = [2, 'SGD', sgd2];
      this._table1.row.add(row);

      var bnd = rates.IDR / rates.BND;
      var bnd2 = formatCurrency(bnd, 'en-US', '', 'BND');
      console.log('BND : ' + bnd2);
      row = [3, 'BND', bnd2];
      this._table1.row.add(row);

      var hkd = rates.IDR / rates.HKD;
      var hkd2 = formatCurrency(hkd, 'en-US', '', 'HKD');
      console.log('HKD : ' + hkd2);
      row = [4, 'HKD', hkd2];
      this._table1.row.add(row);

      var btc = rates.IDR / rates.BTC;
      var btc2 = formatCurrency(btc, 'en-US', '', 'BTC');
      console.log('BTC : ' + btc2);
      row = [5, 'BTC', btc2];
      this._table1.row.add(row);

      var bnd = rates.IDR / rates.BND;
      var bnd2 = formatCurrency(bnd, 'en-US', '', 'BND');
      console.log('BND : ' + bnd2);
      row = [6, 'BND', bnd2];
      this._table1.row.add(row);

      var myr = rates.IDR / rates.MYR;
      var myr2 = formatCurrency(myr, 'en-US', '', 'MYR');
      console.log('MYR : ' + myr2);
      row = [7, 'MYR', myr2];
      this._table1.row.add(row);

      var nad = rates.IDR / rates.NAD;
      var nad2 = formatCurrency(nad, 'en-US', '', 'NAD');
      console.log('NAD : ' + nad2);
      row = [8, 'NAD', nad2];
      this._table1.row.add(row);

      var mkd = rates.IDR / rates.MKD;
      var mkd2 = formatCurrency(mkd, 'en-US', '', 'MKD');
      console.log('MKD : ' + mkd2);
      row = [9, 'MKD', mkd2];
      this._table1.row.add(row);

      var ron = rates.IDR / rates.RON;
      var ron2 = formatCurrency(ron, 'en-US', '', 'RON');
      console.log('RON : ' + ron2);
      row = [10, 'RON', ron2];
      this._table1.row.add(row);

      this._table1.draw(false);
    });
  }
}
