import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <!-- burada forma [formGroup]="frm" olarak class içinde tanımlanan fieldın tanımlanabilmesi için app.module.ts de imports içerisine ReactiveFormsModule import edilmesi gerek.böylelikle forma class içerisine ulaşabiliyoruz...ONEMLİ.......-->
    <form [formGroup]="frm" (ngSubmit)="onSubmit()">
      <input type="text" placeholder="Name" formControlName="name" /> <br />
      <input type="text" placeholder="Surname" formControlName="surname" />
      <br />
      <input type="text" placeholder="Email" formControlName="email" /> <br />
      <input type="text" placeholder="Tel" formControlName="tel" /> <br />
      <div formGroupName="address">
        <input
          type="text"
          placeholder="Country"
          formControlName="country"
        /><br />
        <input type="text" placeholder="City" formControlName="city" /><br />
        <input
          type="text"
          placeholder="Address"
          formControlName="address"
        /><br />
      </div>
      <button>Send</button>
    </form>

    <button (click)="markAsTouched()">markAsTouched</button> <br />
    <button (click)="markAllAsTouched()">markAllAsTouched</button> <br />
    <button (click)="markAsUnTouched()">markAsUnTouched</button> <br />
    <button (click)="markAsDirty()">markAsDirty</button> <br />
    <button (click)="markAsPristine()">markAsPristine</button> <br />
    <button (click)="disable()">disable</button> <br />
    <button (click)="enable()">enable</button> <br />

    form touched : {{ frm.touched }} <br />
    'name' form control touched : {{ frm.get('name').touched }}<br>
    'address' form control touched : {{ frm.get('address').touched }}<br>
    <hr>
    'country' form control touched : {{ frm.get('address').get('country').touched }}<br>
    <hr />
    form dirty : {{ frm.dirty }} <br />
    'name' form control dirty : {{ frm.get('name').dirty }}
    <hr />
    form pristine : {{ frm.pristine }} <br />
    'name' form control pristine : {{ frm.get('name').pristine }}

    <!-- <button (click)="ok()">Okey</button>
    Valid: {{ frm.valid }} -->
  `,
})
export class AppComponent {
  frm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.frm = formBuilder.group({
      name: ['', Validators.required],
      surname: ['', [Validators.required]], //burada validationu array olarak verebiliyoruz ve birden fazla validasyon istediğimizde zaten bunu zaruri istiyor.
      email: [''],
      tel: [''],
      address: formBuilder.group({
        country: [''],
        city: [''],
        address: [''],
      }),
    });

    // //aşağıdaki valueChanges sayesinde konsola girilen her bir veri için anlık olarak değişimi console'a yazdırıyoruz bu şekilde form tetiklendiğinde bir metodu tetikleyebilir. herhangi bir form elemanı için de düzenlenebilir.
    // this.frm.valueChanges.subscribe({
    //   next: (data) => {
    //     console.log(data);
    //   },
    // });
  }

  // ok() {
  //   this.frm.get('name').setValue('Gençay', { onlySelf: true }); // burada onlySelf true verildiği için validationa girmeden name değiştiğini görebiliriz. okeye basınca validation true'ya dönmüyor hala false kalıyor.
  // }
  onSubmit() {
    console.log(this.frm.value);
  }


  
 // Change Status Konusu
  markAsTouched() {
    //this.frm.markAsTouched();
    this.frm.get("name").markAsTouched({onlySelf:true});
  }

  markAllAsTouched() {
    this.frm.get("address").markAllAsTouched(); //get('address') yaptığımız için adress ve onun altındaki controller etkilendi. get'i kaldırırsak bütün controllerin etkilendiğini görürüz.
  }

  markAsUnTouched() {
    this.frm.markAsUntouched();
  }

  markAsDirty() {
    this.frm.markAsDirty();
  }

  markAsPristine() {
    this.frm.markAsPristine();
  }

  disable() {
    this.frm.disable();
  }

  enable() {
    this.frm.enable();
  }
}
