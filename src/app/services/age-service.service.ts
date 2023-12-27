import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AgeServiceService {
  constructor() {}

  calculateAge(birthDate: Date): number{
    const today = new Date();
    const dob = new Date(birthDate);
    let age = today.getTime() - dob.getTime();
    const ageInDays = age / (1000 * 24 * 60 * 60);
    const ageInYear = Math.round(ageInDays / 365.25);
    return ageInYear;
  }
}
