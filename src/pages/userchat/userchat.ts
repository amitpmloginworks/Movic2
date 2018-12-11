import { Component, ViewChild  } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Content } from 'ionic-angular';
import { Keyboard } from '@ionic-native/keyboard';
/*
  Generated class for the UserchatPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-userchat',
  templateUrl: 'userchat.html'
})
export class UserchatPagePage {

@ViewChild(Content) content: Content;
public messages:any;
public input:any;
public chat_input:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public keyboard:Keyboard) {
    this.messages = [];
    this.chat_input=''

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserchatPagePage');
  
  }

sendMessage(input){
  console.log('input '+input);
   //this.scrollToBottom();
   this.chat_input=input;
if(this.chat_input!=''){
this.messages.push(this.chat_input);
console.log('message '+this.messages);
this.scrollToBottom();
this.chat_input='';

}
}

  scrollToBottom() {
    console.log("Height" + this.content.scrollHeight);
    //this.content.scrollTo(0, this.content.scrollHeight + 20);
    this.content.scrollToBottom(100);
}

onKeyDown(e ,input) {
    if (e.keyCode == 13) {
      //console.log('Should Close Keyboard');
     // this.keyboard.close();
      this.sendMessage(input);
    }
  }
}
