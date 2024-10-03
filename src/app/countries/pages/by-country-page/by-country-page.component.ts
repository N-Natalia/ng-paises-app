
import { Component, Input } from '@angular/core';
import { Country } from '../../interfaces/country';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {
  @Input()
  public countries: Country[] = [];
  constructor(private CountryService:CountriesService) { }
  searchByCountry(country: string):void {
    this.CountryService.searchCountry(country)
      .subscribe(countries => {
        this.countries = countries;
      });

  }

}
