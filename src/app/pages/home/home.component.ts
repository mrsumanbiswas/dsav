import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { homePage } from 'src/app/models/home-page-data';
import { FirestoreDatabaseService } from 'src/app/services/firestore-database.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  feedback!: boolean;
  data!: homePage | any;
  tableWidth = 'min-content';

  // displayed columns
  displayedColumns: string[] = [
    'i',
    'ii',
    'iii',
    'iv',
    'v'
  ];

  // slider config
  slider_image = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    draggable: false,
    fade: true,
    pauseOnHover: false,
    arrows: false,
    adaptiveHeight: true,
    centerMode: true,
    waitForAnimate: true,
  };

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    adaptiveHeight: true,
    centerMode: true,
    waitForAnimate: true,
  };

  // form group and it's validations
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.email],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: ['', Validators.required],
  });

  constructor(
    private firestore_database: FirestoreDatabaseService,
    private _formBuilder: FormBuilder
  ) {
    // home page data pulling from google firestore datbase
    firestore_database.getData('page', 'home').then(
      (value) => {
        this.data = value;
      }
    )
  }

  ngOnInit(): void {
    // feedback cheker
    this.feedback = (localStorage.getItem('feedBack') !== null) ? true : false;
    //
    let x = 1, y = 1;
    if (innerWidth >= 1024) {
      x = 4;
      y = 2;
      this.tableWidth = 'max-content'
    } else if (innerWidth < 1024 && innerWidth > 425) {
      x = 2;
      y = 1;
      this.tableWidth = 'fit-content'
    }
    this.slideConfig.slidesToShow = x;
    this.slideConfig.slidesToScroll = y;
  }

  submitFeedback(stepper: MatStepper) {
    let id!: string;
    let data = {
      Name: this.firstFormGroup.value.firstCtrl,
      Email: this.secondFormGroup.value.secondCtrl,
      FeedBack: this.thirdFormGroup.value.thirdCtrl,
      TimeStamp: Timestamp.now(),
      isLogedIn: sessionStorage.getItem('isLogedIn'),
      uid: localStorage.getItem('uid'),
    }

    id = (data.uid === null) ? data.Name + JSON.stringify(data.TimeStamp.nanoseconds) : data.uid;
    this.firestore_database.setData('feedBack', id, data)
    localStorage.setItem('feedBack', JSON.stringify(data))
    stepper.reset()
    this.feedback = false;
  }
}