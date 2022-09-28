import { Component, OnInit } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { homePage } from 'src/app/models/home-page-data';
import { FirestoreDatabaseService } from 'src/app/services/firestore-database.service';
import SwiperCore, { Autoplay, EffectCoverflow, Pagination, SwiperOptions } from "swiper";

SwiperCore.use([Autoplay,EffectCoverflow, Pagination]);


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
  slideConfig : SwiperOptions={
    effect:'coverflow',
    spaceBetween:0,
    grabCursor:true,
    centeredSlides:true,
    slidesPerView:4,
    coverflowEffect:{
      rotate:50,
      stretch:0,
      depth:100,
      modifier:1,
      slideShadows:true
    },
    autoplay:true,
    pagination:true
  }

  slider_images:SwiperOptions ={
      spaceBetween:30,
    centeredSlides:true,
    autoplay:{
      delay:3000,
      disableOnInteraction:false
    },
    pagination:{
      clickable:false
    },
    navigation:true
  }

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
    if (innerWidth >= 1024) {
      this.tableWidth = 'max-content'
    } else if (innerWidth < 1024 && innerWidth > 425) {
      this.tableWidth = 'fit-content'
      this.slideConfig.slidesPerView=2
    }else{
      this.slideConfig.slidesPerView=1  
    }
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