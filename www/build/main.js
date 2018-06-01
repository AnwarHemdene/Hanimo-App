webpackJsonp([0],{

/***/ 165:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__signup_signup__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_plus__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_usercrud_usercrud__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, alertCtrl, afDatabase, storage, menu, googlePlus, afAuth, facebook, platform, userProvider, loadCnt) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.afDatabase = afDatabase;
        this.storage = storage;
        this.menu = menu;
        this.googlePlus = googlePlus;
        this.afAuth = afAuth;
        this.facebook = facebook;
        this.platform = platform;
        this.userProvider = userProvider;
        this.loadCnt = loadCnt;
        this.user = {};
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.signIn = function (email, password) {
        var _this = this;
        try {
            this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then(function (result) {
                console.log("sign in succeed");
                console.log(result);
                _this.afDatabase.database.ref("/users/" + result.uid).on("value", function (snap) {
                    console.log(snap.val());
                    _this.user.id = snap.val().id;
                    _this.user.displayName = snap.val().displayName;
                    _this.user.imageUrl = snap.val().imageUrl;
                    _this.user.email = snap.val().email;
                    console.log(_this.user);
                    var currentUser = JSON.stringify(_this.user);
                    _this.storage.set("currentUser", currentUser);
                });
            });
        }
        catch (error) {
            alert(error.message);
        }
    };
    LoginPage.prototype.ionViewDidEnter = function () {
        this.menu.swipeEnable(false);
    };
    LoginPage.prototype.ionViewWillLeave = function () {
        this.menu.swipeEnable(true);
    };
    LoginPage.prototype.googlePlusLogin = function () {
        this.googlePlus.login({
            'webClientId': '1063646526749-rsvbpaum0o6i1ol001h7gjcs36hqrces.apps.googleusercontent.com',
            'offline': true
        }).then(function (res) {
            console.log("resultat : ");
            console.log(res);
            __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.auth().signInWithCredential(__WEBPACK_IMPORTED_MODULE_9_firebase___default.a.auth.GoogleAuthProvider.credential(res.idToken))
                .then(function (success) {
                console.log("google sign in sucess");
                console.log(success);
            }).catch(function (err) {
                console.log("google error");
                console.error(err);
            });
        });
    };
    LoginPage.prototype.facebookLogin = function () {
        var _this = this;
        if (this.platform.is("cordova")) {
            this.facebook.login(['email', 'public_profile']).then(function (result) {
                console.log("facebook login result : " + result);
                var facebook1credential = __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.auth.FacebookAuthProvider.credential(result.authResponse.accessToken);
                __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.auth().signInWithCredential(facebook1credential).then(function (res) {
                    console.log("sign in with credntials facebook : ");
                    console.log(res);
                    //initialize user
                    _this.user.email = res.email;
                    _this.user.id = res.uid;
                    _this.user.imageUrl = res.photoURL;
                    _this.user.displayName = res.displayName;
                    _this.user.connectionType = "fb";
                    console.log(_this.user);
                    //adding to database
                    _this.userProvider.addUser(_this.user);
                    //adding to global storage to simplify access
                    var currentUser = JSON.stringify(_this.user);
                    _this.storage.set("currentUser", currentUser);
                });
            });
        }
        else {
            this.afAuth.auth.signInWithPopup(new __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.auth.FacebookAuthProvider()).then(function (res) {
                console.log(res);
                //initialize user
                _this.user.email = res.user.email;
                _this.user.id = res.user.uid;
                _this.user.imageUrl = res.user.photoURL;
                _this.user.displayName = res.user.displayName;
                console.log(_this.user);
                //adding to database
                _this.userProvider.addUser(_this.user);
                //adding to global storage to simplify access
                var currentUser = JSON.stringify(_this.user);
                _this.storage.set("currentUser", currentUser);
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */]); // tabsPage is replaced by home page
            });
        }
    };
    LoginPage.prototype.resetPassword = function (mailAdress) {
        this.afAuth.auth.sendPasswordResetEmail(mailAdress).then(function () {
            alert("un email de recuperation a ete envoyer a votre adresse");
        });
    };
    LoginPage.prototype.createAcount = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__signup_signup__["a" /* SignupPage */]);
    };
    LoginPage.prototype.alertResestPassword = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Entrer votre adresse mail',
            inputs: [
                {
                    name: 'mail',
                    placeholder: 'utilisateur@mail.com'
                }
            ],
            buttons: [
                {
                    text: 'Annuler',
                    role: 'cancel',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Enoyer mail de renitialisation',
                    handler: function (data) {
                        console.log(data.mail);
                        _this.resetPassword(data.mail);
                    }
                }
            ]
        });
        alert.present();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/home/anwar/pfeHanimo/src/pages/login/login.html"*/'<ion-content class="background">\n  <ion-grid>\n    <ion-row >\n      <ion-col>\n          <ion-img width="100" height="100" src="../../assets/imgs/logo.png"></ion-img>\n      </ion-col>\n    </ion-row>\n    <ion-row >\n        <ion-col>\n          <div class="title-logo">\n            Hanimo\n          </div>\n        </ion-col>\n      </ion-row>\n    <ion-row>\n      <ion-col>\n          <p> Connectez-vous à votre compte </p>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n          <ion-input type="text" placeholder="Votre adresse email" [(ngModel)]="email"></ion-input>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n          <ion-input type="password" placeholder="Votre mot de passe"  [(ngModel)]="password"  ></ion-input>\n          <div class="reverse" > \n          <a (click)="alertResestPassword()"  >  Mot de passe oublié? </a></div>\n      </ion-col>\n    </ion-row>\n    <ion-row >\n        <ion-col>\n            <button class="login-button flat" ion-button block (click)="signIn(email,password)">SE CONNECTER</button>\n        </ion-col>\n    </ion-row>\n    <ion-row>\n        <hr> \n      <ion-col>\n        <p> Me connecter via... </p>\n\n      </ion-col>\n    </ion-row>\n    <ion-row >\n        <ion-col >\n            <button class="google-button flat" ion-button (click)="googlePlusLogin()" >  <ion-icon name="logo-googleplus"></ion-icon>  GOOGLE+</button>\n        </ion-col>\n        <ion-col>\n            <button class="facebook-button flat" ion-button (click)="facebookLogin()" >   <ion-icon name="logo-facebook"></ion-icon>  FACEBOOK</button>\n        </ion-col>\n    </ion-row>\n    <ion-row >\n        <ion-col>\n            <button class="login-button flat" ion-button block (click)="createAcount()" >CREER UN COMPTE</button>\n        </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n<!-- \n\n<ion-row>\n<ion-col >\n  <ion-item>\n    <ion-avatar class="center" >\n      <img src="assets/imgs/HanimoLogo.jpg">\n    </ion-avatar>\n    <p class="connecter-vous-text"> Connectez Vous</p>\n  </ion-item>\n    </ion-col>\n</ion-row>\n<ion-row>\n<ion-col>\n      <ion-item>\n        <ion-label floating>Adresse Email</ion-label>\n        <ion-input type="email" [(ngModel)]="email" flex ></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label floating>Mot de passe</ion-label>\n        <ion-input type="password" [(ngModel)]="password" ></ion-input>\n      </ion-item>\n</ion-col>\n</ion-row>\n<ion-row>\n<ion-col>\n      <ion-item (click)="alertResestPassword()" >\n          <div class="reverse">\n             <a>mot de passe oublié?</a></div>\n      \n      </ion-item>\n</ion-col>\n</ion-row>\n<ion-row>\n<ion-col class="connecter" >      \n      <button class="login-button" (click)="signIn(email,password)" ion-button color="danger" round outline>Se Connecter</button>\n      <hr>  \n      <p >Ou connecter vous via</p>\n      \n</ion-col>\n</ion-row>   \n<ion-row justify-content-star>\n<ion-col > \n      <button class="facebook-button" (click)="facebookLogin()" ion-button color="Primary" outline icon-left>\n        <ion-icon name="logo-facebook"></ion-icon>\n        <div>Facebook</div>\n      </button>\n</ion-col>\n<ion-col >\n      <button class="google-button" (click)="googlePlusLogin()" ion-button color="danger" outline  icon-left>\n        <ion-icon name="logo-google"></ion-icon>\n        <div>Google+</div>\n      </button>\n</ion-col>\n</ion-row>\n<ion-row>\n<ion-col> \n      <!-- <b> Ou </b> -->\n      <!-- <button (click)="createAcount()" block ion-button color="secondary"  icon-left>\n       \n        <div>Creer votre compte</div>\n      </button> \n</ion-col>\n</ion-row> --> '/*ion-inline-end:"/home/anwar/pfeHanimo/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_google_plus__["a" /* GooglePlus */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_10__providers_usercrud_usercrud__["a" /* UsercrudProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 166:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OtherprofilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__comments_modal_comments_modal__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_usercrud_usercrud__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var OtherprofilePage = (function () {
    function OtherprofilePage(navCtrl, navParams, viewController, modalController, afDatabase, afAuth, usercrudProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewController = viewController;
        this.modalController = modalController;
        this.afDatabase = afDatabase;
        this.afAuth = afAuth;
        this.usercrudProvider = usercrudProvider;
        this.currentUser = {};
        this.user = {};
        this.publications = [];
        this.storageRef = __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.storage().ref();
        //in case of friends needed for deleting friend
        this.friendRelation = {};
        // in case of received invitation get the invitation key to receive or decline it 
        this.invitation = {};
        this.currentUser.id = this.navParams.get("currentUserId");
        console.log("currentUser : ", this.currentUser);
        this.user.id = this.navParams.get("userId");
        console.log("user : ", this.user);
        this.relationStatus = this.navParams.get("relationStatus");
        console.log("user : ", this.relationStatus);
        this.afDatabase.database.ref("/users/" + this.user.id).once("value", function (userSnapshot) {
            _this.user = userSnapshot.val();
            console.log(_this.user);
        });
    }
    OtherprofilePage.prototype.ionViewWillEnter = function () {
        if (this.relationStatus == 1) {
            this.getFriendRelationKey();
            this.loadActivities();
        }
    };
    OtherprofilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OtherprofilePage');
    };
    OtherprofilePage.prototype.goBack = function () {
        this.viewController.dismiss();
    };
    OtherprofilePage.prototype.getFriendRelationKey = function () {
        var _this = this;
        var sVerifFriends = this.afDatabase.list("/friends/").valueChanges().subscribe(function (data) {
            data.forEach(function (element) {
                if ((element.id1 == _this.currentUser.id && element.id2 == _this.user.id) || (element.id2 == _this.currentUser.id && element.id1 == _this.user.id)) {
                    console.log("friends");
                    //this.relationStatus = 1;
                    _this.friendRelation = element;
                    console.log("friendRelation : ", _this.friendRelation);
                }
            });
            sVerifFriends.unsubscribe();
        });
    };
    OtherprofilePage.prototype.loadActivities = function () {
        var _this = this;
        //getting publication
        this.afDatabase.database.ref("/publications/").orderByChild("creatorId")
            .equalTo(this.user.id).once("value", function (snapshots) {
            snapshots.forEach(function (element) {
                var pub = {};
                pub = element.val();
                pub.order = "publication";
                pub.liked = false;
                pub.myComment = "";
                _this.isLiked(pub);
                console.log(pub);
                var d = new Date(pub.date);
                pub.time = d.getDay().toString() + "," + d.getMonth().toString() + "," + d.getHours() + ":" + d.getMinutes();
                if (pub.nbimage > 0) {
                    pub.imagesUrl = []; /**/
                    for (var i = 0; i < pub.nbimage; i++) {
                        _this.storageRef.child("publicationsimages/" + pub.key + "/" + i + ".jpg").getDownloadURL().then(function (res) {
                            pub.imagesUrl.push(res);
                        });
                    }
                    console.log(pub.imagesUrl);
                }
                // pub.displayName = this.currentUser.displayName;
                // pub.avaterUrl = snap.val().imageUrl;
                // console.log(pub);
                _this.publications.push(pub);
                console.log(pub);
                console.log(_this.publications);
                return false;
            });
        });
        //getting annonces
        this.afDatabase.database.ref("/annonces/").orderByChild("creatorAnnonceId")
            .equalTo(this.user.id).once("value", function (snapshots) {
            snapshots.forEach(function (element) {
                var pub = {};
                pub = element.val();
                pub.order = "annonce";
                pub.liked = false;
                pub.myComment = "";
                _this.isLiked(pub);
                console.log(pub);
                var d = new Date(pub.date);
                pub.time = d.getDay().toString() + "," + d.getMonth().toString() + "," + d.getHours() + ":" + d.getMinutes();
                if (pub.nbimage > 0) {
                    pub.imagesUrl = []; /**/
                    for (var i = 0; i < pub.nbimage; i++) {
                        _this.storageRef.child("annoncesimages/" + pub.idAnnonce + "/" + i + ".jpg").getDownloadURL().then(function (res) {
                            pub.imagesUrl.push(res);
                        });
                    }
                    console.log(pub.imagesUrl);
                }
                // pub.displayName = this.currentUser.displayName;
                // pub.avaterUrl = snap.val().imageUrl;
                // console.log(pub);
                _this.publications.push(pub);
                console.log(pub);
                console.log(_this.publications);
                return false;
            });
        });
    };
    OtherprofilePage.prototype.likePub = function (pub) {
        pub.liked = true;
        if (pub.order == "annonce") {
            this.afDatabase.list('/annonces/' + pub.idAnnonce + '/likes/').set(this.currentUser.id, {
                userId: this.currentUser.id
            });
        }
        else if (pub.order == "publication") {
            this.afDatabase.list('/publications/' + pub.key + '/likes/').set(this.currentUser.id, {
                userId: this.currentUser.id
            });
        }
    };
    OtherprofilePage.prototype.dislikePub = function (pub) {
        console.log(pub);
        pub.liked = false;
        if (pub.order == "annonce") {
            this.afDatabase.list('/annonces/' + pub.idAnnonce + '/likes/' + this.currentUser.id).remove();
        }
        else if (pub.order == "publication") {
            this.afDatabase.list('/publications/' + pub.key + '/likes/' + this.currentUser.id).remove();
        }
    };
    OtherprofilePage.prototype.isLiked = function (pub) {
        if (pub.order == "annonce") {
            var sLikes_1 = this.afDatabase.list("/annonces/" + pub.idAnnonce + "/likes/" + this.currentUser.id).valueChanges().subscribe(function (data) {
                console.log(data.length);
                if (data.length == 1) {
                    pub.liked = true;
                    console.log(pub.liked);
                }
                else {
                    pub.liked = false;
                    console.log(pub.liked);
                }
                sLikes_1.unsubscribe();
            });
        }
        else if (pub.order == "publication") {
            var sLikes_2 = this.afDatabase.list("/publications/" + pub.key + "/likes/" + this.currentUser.id).valueChanges().subscribe(function (data) {
                console.log(data.length);
                if (data.length == 1) {
                    pub.liked = true;
                    console.log(pub.liked);
                }
                else {
                    pub.liked = false;
                    console.log(pub.liked);
                }
                sLikes_2.unsubscribe();
            });
        }
    };
    OtherprofilePage.prototype.commenter = function (pub) {
        console.log("adding comment");
        console.log(pub.myComment);
        if (pub.order == "annonce") {
            var newRef = this.afDatabase.list('/annonces/' + pub.idAnnonce + '/comments/').push({});
            newRef.set({
                commentKey: newRef.key,
                userId: this.currentUser.id,
                commentContent: pub.myComment,
                date: __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database.ServerValue.TIMESTAMP
            }).then(function () { pub.myComment = ""; });
        }
        else if (pub.order == "publication") {
            var newRef = this.afDatabase.list('/publications/' + pub.key + '/comments/').push({});
            newRef.set({
                commentKey: newRef.key,
                userId: this.currentUser.id,
                commentContent: pub.myComment,
                date: __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database.ServerValue.TIMESTAMP
            }).then(function () { pub.myComment = ""; });
        }
    };
    OtherprofilePage.prototype.openCommentsModal = function (pub) {
        if (pub.order == "annonce") {
            var commentsModalPage = this.modalController.create(__WEBPACK_IMPORTED_MODULE_4__comments_modal_comments_modal__["a" /* CommentsModalPage */], {
                "order": "annonce",
                "idAnnonce": pub.idAnnonce,
                "titleAnnonce": pub.titleAnnonce
            }).present();
        }
        else if (pub.order == "publication") {
            var commentsModalPage = this.modalController.create(__WEBPACK_IMPORTED_MODULE_4__comments_modal_comments_modal__["a" /* CommentsModalPage */], {
                "order": "publication",
                "idAnnonce": pub.key
            }).present();
        }
    };
    // NON TESTEE
    OtherprofilePage.prototype.sendInvitation = function () {
        console.log("idReceiver : ", this.user.id);
        var invitation = {};
        invitation.idReceiver = this.user.id;
        invitation.idSender = this.currentUser.id;
        console.log(invitation);
        this.relationStatus = 2;
        var newRef = this.afDatabase.list('/invitations/').push({});
        newRef.set({
            key: newRef.key,
            idSender: invitation.idSender,
            idReceiver: invitation.idReceiver,
            date: __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database.ServerValue.TIMESTAMP
        });
    };
    // NON TESTEE
    OtherprofilePage.prototype.supprimerAmis = function () {
        var _this = this;
        console.log(this.friendRelation.key);
        this.afDatabase.list('/friends/').remove(this.friendRelation.key).then(function (res) {
            _this.relationStatus = 0;
            console.log("deleting : ", res, _this.friendRelation.key);
        });
    };
    // NON TESTEE
    OtherprofilePage.prototype.annulerInvitation = function () {
        var _this = this;
        this.afDatabase.database.ref("/invitations/").orderByChild("idSender").equalTo(this.currentUser.id).once("value", function (snap) {
            console.log(snap);
            snap.forEach(function (element) {
                if (element.val().idReceiver == _this.user.id) {
                    console.log(element);
                    var key = element.val().key;
                    _this.afDatabase.list('/invitations/').remove(key);
                    _this.relationStatus = 0;
                    return false;
                }
            });
        });
    };
    OtherprofilePage.prototype.initilizeInvitation = function () {
        var _this = this;
        this.afDatabase.database.ref("/invitations/").orderByChild("idReceiver").equalTo(this.currentUser.id).once("value", function (snapShotInvit) {
            snapShotInvit.forEach(function (invit) {
                if (invit.val().idSender == _this.user.id) {
                    _this.invitation = invit.val();
                    console.log(_this.invitation);
                }
                return false;
            });
        });
    };
    OtherprofilePage.prototype.accepterInvitation = function () {
        var friendRef = this.afDatabase.list('/friends/').push({});
        friendRef.set({
            key: friendRef.key,
            id1: this.user.id,
            id2: this.currentUser.id,
            date: __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database.ServerValue.TIMESTAMP
        });
        this.afDatabase.list('/invitations/').remove(this.invitation.key);
        this.relationStatus = 1;
    };
    // NON TESTEE
    OtherprofilePage.prototype.declinerInvitation = function () {
        this.afDatabase.list('/invitations/').remove(this.invitation.key);
        this.relationStatus = 0;
    };
    OtherprofilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-otherprofile',template:/*ion-inline-start:"/home/anwar/pfeHanimo/src/pages/otherprofile/otherprofile.html"*/'<!--\n  Generated template for the OtherprofilePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n      <ion-buttons start>\n          <button ion-button (click)="goBack()">\n              <ion-icon name="md-arrow-back"></ion-icon>\n          </button>\n      </ion-buttons>\n    <ion-title>{{user.displayName}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n    <img id="profile-image" src="{{user.imageUrl}}">\n    <ion-item>\n        <!-- amis -->\n      <button item-start *ngIf="relationStatus == 1" ion-button >Amis</button>\n      <button item-start (click)="supprimerAmis()" *ngIf="relationStatus == 1" ion-button >Supprimer</button>\n      \n      <!-- envoyer invitation -->\n      <button item-start (click)="sendInvitation()" *ngIf="relationStatus == 0" ion-button >Envoyer une invitation</button>\n\n      <!-- invitation envoyee -->\n      <button item-start (click)="annulerInvitation()" *ngIf="relationStatus == 2" ion-button >Invitation envoyée</button>\n      \n      <!-- accepter ou decliner invitation -->\n      <button item-start (click)="accepterInvitation()" *ngIf="relationStatus == 3" ion-button >Accrepter l invitation</button>\n      <button item-start (click)="declinerInvitation()" *ngIf="relationStatus == 3" ion-button >decliner l invitation</button>\n\n      <!-- a propos -->\n      <button item-end ion-button >A propos</button>\n    </ion-item>\n    \n\n    <ion-list *ngIf="publications && relationStatus == 1" >\n        <ion-card *ngFor="let pub of publications" >\n\n            <ion-item>\n                <ion-avatar item-start>\n                  <img src="{{user.imageUrl}}">\n                </ion-avatar>\n                <ion-card-header *ngIf="pub.order == \'sharingannonce\'; else templateName" >\n                    <p>{{user.displayName}} a partagé une {{pub.type}} de {{pub.userDipslayName}}</p>\n                </ion-card-header>\n                <p>{{pub.time}}</p>\n              </ion-item>\n\n            <ng-template #templateName>\n                {{user.displayName}} a partagé une {{pub.order}}\n            </ng-template>\n\n            <ion-row>\n                <ion-slides zoom="true" pager>\n                    <ion-slide *ngFor="let img of pub.imagesUrl">\n                        <img style="width: 359px; height: 300px;" src="{{img}}" imageViewer>\n                    </ion-slide>\n                </ion-slides>\n            </ion-row>\n\n            <ion-card-content>\n                <p *ngIf="pub.order == \'annonce\'" >{{pub.descAnnonce}}</p>\n                <p *ngIf="pub.order == \'publication\'" >{{pub.content}}</p>\n            </ion-card-content>\n\n            <ion-row>\n                <!-- *ngIf="!isLiked(pub)"  -->\n                <ion-col *ngIf="!pub.liked" >\n                    <button (click)="likePub(pub)" ion-button icon-left clear small>\n                    <ion-icon name="ios-heart-outline"></ion-icon>\n                    <div>J\'aime</div>\n                    </button>\n                </ion-col>\n            \n                <!--   *ngIf="isLiked(pub)"  -->\n                <ion-col *ngIf="pub.liked" >\n                    <button (click)="dislikePub(pub)" ion-button icon-left clear small>\n                    <ion-icon name="ios-heart"></ion-icon>\n                    <div>J\'aime pas</div>\n                    </button>\n                </ion-col>\n            \n                <ion-col>\n                    <button (click)="openCommentsModal(pub)" ion-button icon-left clear small>\n                    <ion-icon name="text"></ion-icon>\n                    <div>Commentaires</div>\n                    </button>\n                </ion-col>\n            \n            </ion-row>\n            \n                <ion-item>\n                    <ion-input placeholder="ajouter un commentaire" [(ngModel)]="pub.myComment" item-start> </ion-input>\n                    <button ion-button (click)="commenter(pub)" item-end>COM</button>\n                </ion-item>\n\n        </ion-card>\n    </ion-list>\n\n\n</ion-content>\n'/*ion-inline-end:"/home/anwar/pfeHanimo/src/pages/otherprofile/otherprofile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_6__providers_usercrud_usercrud__["a" /* UsercrudProvider */]])
    ], OtherprofilePage);
    return OtherprofilePage;
}());

//# sourceMappingURL=otherprofile.js.map

/***/ }),

/***/ 167:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PubsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__usercrud_usercrud__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var PubsProvider = (function () {
    function PubsProvider(http, afDatabase, usercrudProvider) {
        this.http = http;
        this.afDatabase = afDatabase;
        this.usercrudProvider = usercrudProvider;
        console.log('Hello PubsProvider Provider');
    }
    PubsProvider.prototype.addConseil = function (conseil) {
        var ref = this.afDatabase.database.ref('/conseils/').push({});
        console.log("conseil from provider : ");
        console.log(conseil);
        ref.set({
            conseilId: ref.key,
            conseilCreatorId: conseil.conseilCreatorId,
            conseilContent: conseil.content,
            date: __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database.ServerValue.TIMESTAMP
        });
        this.usercrudProvider.updateReputation(conseil.conseilCreatorId, 3);
    };
    PubsProvider.prototype.addPublication = function (publication, captureData) {
        var _this = this;
        var newRef = this.afDatabase.list("/publications/").push({});
        publication.key = newRef.key;
        newRef.set(publication).then(function () {
            console.log(publication);
            var _loop_1 = function (index) {
                console.log("captureData[index] : ");
                console.log(captureData[index]);
                _this.uploadImagePublication(captureData[index], publication.key, index).then(function () { index++; });
                out_index_1 = index;
            };
            var out_index_1;
            for (var index = 0; index < captureData.length; index++) {
                _loop_1(index);
                index = out_index_1;
            }
        });
    };
    PubsProvider.prototype.uploadImagePublication = function (captureDataUrl, idPublication, i) {
        return __awaiter(this, void 0, void 0, function () {
            var storageRef, filename, imageRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.storage().ref("publicationsimages/" + idPublication + "/")];
                    case 1:
                        storageRef = _a.sent();
                        filename = i + ".jpg";
                        imageRef = storageRef.child(filename);
                        return [4 /*yield*/, imageRef.putString(captureDataUrl, __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.storage.StringFormat.DATA_URL).then(function (snap) {
                                console.log("image added : " + snap);
                                console.log(snap);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PubsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_3__usercrud_usercrud__["a" /* UsercrudProvider */]])
    ], PubsProvider);
    return PubsProvider;
}());

//# sourceMappingURL=pubs.js.map

/***/ }),

/***/ 168:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnnonceA0Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_annonce_crud_annonce_crud__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_usercrud_usercrud__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_diagnostic__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_native_geocoder__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__home_home__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};










var AnnonceA0Page = (function () {
    function AnnonceA0Page(navCtrl, alertCtrl, toastCtrl, afAuth, annonceProvider, usercrudProvider, camera, geolocation, nativeGeocoder, loadingCtrl, diagnostic) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.afAuth = afAuth;
        this.annonceProvider = annonceProvider;
        this.usercrudProvider = usercrudProvider;
        this.camera = camera;
        this.geolocation = geolocation;
        this.nativeGeocoder = nativeGeocoder;
        this.loadingCtrl = loadingCtrl;
        this.diagnostic = diagnostic;
        this.locationString = "chargement ... ";
        this.annonce = {};
        this.user = {};
        this.imgUrl = '';
        this.imageNumber = 0;
        this.captureDataUrl = [];
        console.log("-------------------------------------------");
        this.geolocation.getCurrentPosition().then(function (resp) {
            console.log("access position given");
            console.log(resp);
            _this.currentLocation = resp.coords;
            _this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude)
                .then(function (result) {
                console.log(result);
                _this.locationString = result[0].locality + " ," + result[0].thoroughfare;
                console.log(_this.locationString);
            }).catch(function (error) { return console.log(error); });
        }).catch(function (error) {
            _this.navCtrl.pop();
            console.log('Error getting location', error);
        });
        this.afAuth.auth.onAuthStateChanged(function (user) {
            if (user) {
                _this.user.id = user.uid;
                console.log(_this.user.id);
            }
            else {
                console.log("Erreur de chargement");
            }
        });
    }
    AnnonceA0Page.prototype.publierAnnonce = function (annonce) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.diagnostic.isLocationEnabled().then(function (res) {
                    if (res == true) {
                        var loading_1 = _this.loadingCtrl.create({
                            content: 'Publication ...',
                        });
                        loading_1.present().then(function () {
                            console.log("current location : ");
                            console.log(_this.currentLocation);
                            annonce.typeAnnonce = 0;
                            annonce.nbimage = _this.imageNumber;
                            annonce.latitude = _this.currentLocation.latitude;
                            annonce.longitude = _this.currentLocation.longitude;
                            annonce.creatorAnnonceId = _this.user.id;
                            console.log(annonce);
                            _this.annonceProvider.addingAnnonce(annonce, _this.captureDataUrl).then(function () {
                                _this.usercrudProvider.updateReputation(_this.user.id, 12);
                            }).then(function () {
                                loading_1.dismissAll();
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__home_home__["a" /* HomePage */]);
                                console.log("dismissing loader");
                            });
                        });
                    }
                    else {
                        alert("Veuillez activez votre gps");
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    AnnonceA0Page.prototype.capture = function (sourceType) {
        var _this = this;
        console.log("cameraaaaaaaa capture");
        var cameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: sourceType,
            correctOrientation: true
        };
        this.camera.getPicture(cameraOptions).then(function (imageData) {
            console.log(imageData);
            var dataUrl = 'data:image/jpeg;base64,' + imageData;
            _this.captureDataUrl.push(dataUrl);
            _this.imageNumber++;
            console.log(_this.captureDataUrl);
        }, function (err) {
            console.log(err);
        });
    };
    AnnonceA0Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-annonce-a0',template:/*ion-inline-start:"/home/anwar/pfeHanimo/src/pages/annonce-a0/annonce-a0.html"*/'<ion-header>\n    <ion-navbar color="sandy-brown">\n      <ion-title>Animal En Danger</ion-title>\n    </ion-navbar>\n  </ion-header>\n\n  <ion-content>\n\n    <ion-card>\n\n      <ion-card-header>\n        <div class="category cat-work">Danger</div>\n      </ion-card-header>\n      <b></b>\n\n      <ion-card-content>\n\n      <ion-grid>\n          <ion-row>\n            <ion-item>\n              <ion-label floating >Titre de l\'annonce</ion-label>\n              <ion-input [(ngModel)]="annonce.titleAnnonce" type="text"> </ion-input>\n            </ion-item> \n          </ion-row>\n\n          <ion-row>\n            <ion-col col-lg-2>\n              <ion-item >\n                  <ion-label floating >Votre description</ion-label>\n                  <ion-textarea [(ngModel)]="annonce.descAnnonce" type="text" rows="4" cols="50"> </ion-textarea>\n                </ion-item>\n              </ion-col>\n              <ion-col col-3>\n                <button ion-button clear class="button-md-marker">\n                  <ion-icon name="md-locate" color="sos" class="ion-md-locate-marker"></ion-icon>\n                  <br><br>\n                </button>\n                {{locationString}}\n              </ion-col>\n          </ion-row>\n\n          <ion-row>\n            <ion-item>\n              <button ion-button  (click)="capture(1)" color="sandy-brown">\n                <ion-icon name="ios-camera"> Camera !</ion-icon>\n              </button>\n              <!-- <img [src]="captureDataUrl[0]" *ngIf="captureDataUrl[0]" /> -->\n              <button ion-button (click)="capture(0)" color="sandy-brown">\n                <ion-icon name="ios-image">Gallerie !</ion-icon>\n              </button>\n\n              <ion-row *ngIf="captureDataUrl">\n                  <ion-slides zoom="true" pager>\n                    <ion-slide *ngFor="let img of captureDataUrl">\n                      <img src="{{img}}">\n                    </ion-slide>\n                  </ion-slides>\n              </ion-row>\n            </ion-item>\n          </ion-row>\n\n          <ion-row>\n            <ion-item>\n              <button (click)="publierAnnonce(annonce)" ion-button  color="sos">Publier</button>\n            </ion-item>\n          </ion-row>\n          \n        </ion-grid>\n\n      </ion-card-content>\n\n    </ion-card>\n\n  </ion-content>'/*ion-inline-end:"/home/anwar/pfeHanimo/src/pages/annonce-a0/annonce-a0.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_3__providers_annonce_crud_annonce_crud__["a" /* AnnonceCrudProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_usercrud_usercrud__["a" /* UsercrudProvider */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_native_geocoder__["a" /* NativeGeocoder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_diagnostic__["a" /* Diagnostic */]])
    ], AnnonceA0Page);
    return AnnonceA0Page;
}());

//# sourceMappingURL=annonce-a0.js.map

/***/ }),

/***/ 169:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnnonceA3Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_annonce_crud_annonce_crud__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_usercrud_usercrud__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_diagnostic__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_native_geocoder__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__home_home__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};










var AnnonceA3Page = (function () {
    function AnnonceA3Page(navCtrl, alertCtrl, toastCtrl, afAuth, annonceProvider, usercrudProvider, camera, geolocation, nativeGeocoder, loadingCtrl, diagnostic) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.afAuth = afAuth;
        this.annonceProvider = annonceProvider;
        this.usercrudProvider = usercrudProvider;
        this.camera = camera;
        this.geolocation = geolocation;
        this.nativeGeocoder = nativeGeocoder;
        this.loadingCtrl = loadingCtrl;
        this.diagnostic = diagnostic;
        this.locationString = "chargement ... ";
        this.annonce = {};
        this.user = {};
        this.imgUrl = '';
        this.imageNumber = 0;
        this.captureDataUrl = [];
        console.log("-------------------------------------------");
        this.geolocation.getCurrentPosition().then(function (resp) {
            console.log("access position given");
            console.log(resp);
            _this.currentLocation = resp.coords;
            _this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude)
                .then(function (result) {
                console.log(result);
                _this.locationString = result.locality + " ," + result.thoroughfare;
                console.log(_this.locationString);
            }).catch(function (error) { return console.log(error); });
        }).catch(function (error) {
            _this.navCtrl.pop();
            console.log('Error getting location', error);
        });
        this.afAuth.auth.onAuthStateChanged(function (user) {
            if (user) {
                _this.user.id = user.uid;
                console.log(_this.user.id);
            }
            else {
                console.log("Erreur de chargement");
            }
        });
    }
    AnnonceA3Page.prototype.publierAnnonce = function (annonce) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.diagnostic.isLocationEnabled().then(function (res) {
                    if (res == true) {
                        var loading_1 = _this.loadingCtrl.create({
                            content: 'Publication ...',
                        });
                        loading_1.present().then(function () {
                            console.log("current location : ");
                            console.log(_this.currentLocation);
                            annonce.typeAnnonce = 0;
                            annonce.nbimage = _this.imageNumber;
                            annonce.latitude = _this.currentLocation.latitude;
                            annonce.longitude = _this.currentLocation.longitude;
                            annonce.creatorAnnonceId = _this.user.id;
                            console.log(annonce);
                            _this.annonceProvider.addingAnnonce(annonce, _this.captureDataUrl).then(function () {
                                _this.usercrudProvider.updateReputation(_this.user.id, 12);
                            }).then(function () {
                                loading_1.dismissAll();
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__home_home__["a" /* HomePage */]);
                                console.log("dismissing loader");
                            });
                        });
                    }
                    else {
                        alert("Veuillez activez votre gps");
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    AnnonceA3Page.prototype.capture = function (sourceType) {
        var _this = this;
        console.log("cameraaaaaaaa capture");
        var cameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: sourceType,
            correctOrientation: true
        };
        this.camera.getPicture(cameraOptions).then(function (imageData) {
            console.log(imageData);
            var dataUrl = 'data:image/jpeg;base64,' + imageData;
            _this.captureDataUrl.push(dataUrl);
            _this.imageNumber++;
            console.log(_this.captureDataUrl);
        }, function (err) {
            console.log(err);
        });
    };
    AnnonceA3Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-annonce-a3',template:/*ion-inline-start:"/home/anwar/pfeHanimo/src/pages/annonce-a3/annonce-a3.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>annonceA3</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-card>\n    <ion-card-content>\n        <ion-list no-lines>\n            <ion-list-header> Poster votre annonce </ion-list-header> \n            <ion-item>\n              <ion-label floating >Titre de l\'annonce</ion-label>\n              <ion-input [(ngModel)]="annonce.titleAnnonce" type="text"> </ion-input>\n            </ion-item> \n            <ion-item>\n              <ion-label floating >Votre description</ion-label>\n              <ion-textarea [(ngModel)]="annonce.descAnnonce" type="text"> </ion-textarea>\n            </ion-item>\n              \n            <ion-item>\n              <button ion-button (click)="capture(1)">Lets take a picture!</button>\n\n              <ion-slides *ngIf="captureDataUrl[0]" class="image-slider" loop="true" slidesPerView="2">\n                <ion-slide *ngFor="let img of captureDataUrl">\n                  <img [src]="img" class="thumb-img" imageViewer/>\n                </ion-slide>\n              </ion-slides>\n\n              <button ion-button (click)="capture(0)">pickImage</button>\n          </ion-item>\n  \n            <ion-item>\n                <button (click)="publierAnnonce(annonce)" ion-button round>Publier</button>\n            </ion-item>\n          </ion-list>\n    </ion-card-content>\n  </ion-card>\n  </ion-content>\n'/*ion-inline-end:"/home/anwar/pfeHanimo/src/pages/annonce-a3/annonce-a3.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_3__providers_annonce_crud_annonce_crud__["a" /* AnnonceCrudProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_usercrud_usercrud__["a" /* UsercrudProvider */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_native_geocoder__["a" /* NativeGeocoder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_diagnostic__["a" /* Diagnostic */]])
    ], AnnonceA3Page);
    return AnnonceA3Page;
}());

//# sourceMappingURL=annonce-a3.js.map

/***/ }),

/***/ 170:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnnonceA2Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_annonce_crud_annonce_crud__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_usercrud_usercrud__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_diagnostic__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_native_geocoder__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__home_home__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};










var AnnonceA2Page = (function () {
    function AnnonceA2Page(navCtrl, alertCtrl, toastCtrl, afAuth, annonceProvider, usercrudProvider, camera, geolocation, nativeGeocoder, loadingCtrl, diagnostic) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.afAuth = afAuth;
        this.annonceProvider = annonceProvider;
        this.usercrudProvider = usercrudProvider;
        this.camera = camera;
        this.geolocation = geolocation;
        this.nativeGeocoder = nativeGeocoder;
        this.loadingCtrl = loadingCtrl;
        this.diagnostic = diagnostic;
        this.locationString = "chargement ... ";
        this.annonce = {};
        this.user = {};
        this.imgUrl = '';
        this.imageNumber = 0;
        this.captureDataUrl = [];
        console.log("-------------------------------------------");
        this.geolocation.getCurrentPosition().then(function (resp) {
            console.log("access position given");
            console.log(resp);
            _this.currentLocation = resp.coords;
            _this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude)
                .then(function (result) {
                console.log(result);
                _this.locationString = result.locality + " ," + result.thoroughfare;
                console.log(_this.locationString);
            }).catch(function (error) { return console.log(error); });
        }).catch(function (error) {
            _this.navCtrl.pop();
            console.log('Error getting location', error);
        });
        this.afAuth.auth.onAuthStateChanged(function (user) {
            if (user) {
                _this.user.id = user.uid;
                console.log(_this.user.id);
            }
            else {
                console.log("Erreur de chargement");
            }
        });
    }
    AnnonceA2Page.prototype.publierAnnonce = function (annonce) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.diagnostic.isLocationEnabled().then(function (res) {
                    if (res == true) {
                        var loading_1 = _this.loadingCtrl.create({
                            content: 'Publication ...',
                        });
                        loading_1.present().then(function () {
                            console.log("current location : ");
                            console.log(_this.currentLocation);
                            annonce.typeAnnonce = 2;
                            annonce.nbimage = _this.imageNumber;
                            annonce.latitude = _this.currentLocation.latitude;
                            annonce.longitude = _this.currentLocation.longitude;
                            annonce.creatorAnnonceId = _this.user.id;
                            console.log(annonce);
                            _this.annonceProvider.addingAnnonce(annonce, _this.captureDataUrl).then(function () {
                                _this.usercrudProvider.updateReputation(_this.user.id, 6);
                            }).then(function () {
                                loading_1.dismissAll();
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__home_home__["a" /* HomePage */]);
                                console.log("dismissing loader");
                            });
                        });
                    }
                    else {
                        alert("Veuillez activez votre gps");
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    AnnonceA2Page.prototype.capture = function (sourceType) {
        var _this = this;
        console.log("cameraaaaaaaa capture");
        var cameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: sourceType,
            correctOrientation: true
        };
        this.camera.getPicture(cameraOptions).then(function (imageData) {
            console.log(imageData);
            var dataUrl = 'data:image/jpeg;base64,' + imageData;
            _this.captureDataUrl.push(dataUrl);
            _this.imageNumber++;
            console.log(_this.captureDataUrl);
        }, function (err) {
            console.log(err);
        });
    };
    AnnonceA2Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-annonce-a2',template:/*ion-inline-start:"/home/anwar/pfeHanimo/src/pages/annonce-a2/annonce-a2.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>annonceA2</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-card>\n    <ion-card-content>\n        <ion-list no-lines>\n            <ion-list-header> Poster votre annonce </ion-list-header> \n            <ion-item>\n              <ion-label floating >Titre de l\'annonce</ion-label>\n              <ion-input [(ngModel)]="annonce.titleAnnonce" type="text"> </ion-input>\n            </ion-item> \n            <ion-item>\n              <ion-label floating >Votre description</ion-label>\n              <ion-textarea [(ngModel)]="annonce.descAnnonce" type="text"> </ion-textarea>\n            </ion-item>\n              \n            <ion-item>\n              <button ion-button (click)="capture(1)">Lets take a picture!</button>\n\n              <ion-slides *ngIf="captureDataUrl[0]" class="image-slider" loop="true" slidesPerView="2">\n                <ion-slide *ngFor="let img of captureDataUrl">\n                  <img [src]="img" class="thumb-img" imageViewer/>\n                </ion-slide>\n              </ion-slides>\n\n              <button ion-button (click)="capture(0)">pickImage</button>\n          </ion-item>\n  \n            <ion-item>\n                <button (click)="publierAnnonce(annonce)" ion-button round>Publier</button>\n            </ion-item>\n          </ion-list>\n    </ion-card-content>\n  </ion-card>\n  </ion-content>\n'/*ion-inline-end:"/home/anwar/pfeHanimo/src/pages/annonce-a2/annonce-a2.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_3__providers_annonce_crud_annonce_crud__["a" /* AnnonceCrudProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_usercrud_usercrud__["a" /* UsercrudProvider */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_native_geocoder__["a" /* NativeGeocoder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_diagnostic__["a" /* Diagnostic */]])
    ], AnnonceA2Page);
    return AnnonceA2Page;
}());

//# sourceMappingURL=annonce-a2.js.map

/***/ }),

/***/ 171:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnnonceA1Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_annonce_crud_annonce_crud__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_usercrud_usercrud__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_diagnostic__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_native_geocoder__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__home_home__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};










var AnnonceA1Page = (function () {
    function AnnonceA1Page(navCtrl, alertCtrl, toastCtrl, afAuth, annonceProvider, usercrudProvider, camera, geolocation, nativeGeocoder, loadingCtrl, diagnostic) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.afAuth = afAuth;
        this.annonceProvider = annonceProvider;
        this.usercrudProvider = usercrudProvider;
        this.camera = camera;
        this.geolocation = geolocation;
        this.nativeGeocoder = nativeGeocoder;
        this.loadingCtrl = loadingCtrl;
        this.diagnostic = diagnostic;
        this.locationString = "chargement ... ";
        this.annonce = {};
        this.user = {};
        this.imgUrl = '';
        this.imageNumber = 0;
        this.captureDataUrl = [];
        console.log("-------------------------------------------");
        this.geolocation.getCurrentPosition().then(function (resp) {
            console.log("access position given");
            console.log(resp);
            _this.currentLocation = resp.coords;
            _this.nativeGeocoder.reverseGeocode(resp.coords.latitude, resp.coords.longitude)
                .then(function (result) {
                console.log(result);
                _this.locationString = result.locality + " ," + result.thoroughfare;
                console.log(_this.locationString);
            }).catch(function (error) { return console.log(error); });
        }).catch(function (error) {
            _this.navCtrl.pop();
            console.log('Error getting location', error);
        });
        this.afAuth.auth.onAuthStateChanged(function (user) {
            if (user) {
                _this.user.id = user.uid;
                console.log(_this.user.id);
            }
            else {
                console.log("Erreur de chargement");
            }
        });
    }
    AnnonceA1Page.prototype.publierAnnonce = function (annonce) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.diagnostic.isLocationEnabled().then(function (res) {
                    if (res == true) {
                        var loading_1 = _this.loadingCtrl.create({
                            content: 'Publication ...',
                        });
                        loading_1.present().then(function () {
                            console.log("current location : ");
                            console.log(_this.currentLocation);
                            annonce.typeAnnonce = 1;
                            annonce.nbimage = _this.imageNumber;
                            annonce.latitude = _this.currentLocation.latitude;
                            annonce.longitude = _this.currentLocation.longitude;
                            annonce.creatorAnnonceId = _this.user.id;
                            console.log(annonce);
                            _this.annonceProvider.addingAnnonce(annonce, _this.captureDataUrl).then(function () {
                                _this.usercrudProvider.updateReputation(_this.user.id, 10);
                            }).then(function () {
                                loading_1.dismissAll();
                                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_9__home_home__["a" /* HomePage */]);
                                console.log("dismissing loader");
                            });
                        });
                    }
                    else {
                        alert("Veuillez activez votre gps");
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    AnnonceA1Page.prototype.capture = function (sourceType) {
        var _this = this;
        console.log("cameraaaaaaaa capture");
        var cameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: sourceType,
            correctOrientation: true
        };
        this.camera.getPicture(cameraOptions).then(function (imageData) {
            console.log(imageData);
            var dataUrl = 'data:image/jpeg;base64,' + imageData;
            _this.captureDataUrl.push(dataUrl);
            _this.imageNumber++;
            console.log(_this.captureDataUrl);
        }, function (err) {
            console.log(err);
        });
    };
    AnnonceA1Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-annonce-a1',template:/*ion-inline-start:"/home/anwar/pfeHanimo/src/pages/annonce-a1/annonce-a1.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>annonceA1</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <ion-card>\n    <ion-card-content>\n        <ion-list no-lines>\n            <ion-list-header> Poster votre annonce </ion-list-header> \n            <ion-item>\n              <ion-label floating >Titre de l\'annonce</ion-label>\n              <ion-input [(ngModel)]="annonce.titleAnnonce" type="text"> </ion-input>\n            </ion-item> \n            <ion-item>\n              <ion-label floating >Votre description</ion-label>\n              <ion-textarea [(ngModel)]="annonce.descAnnonce" type="text"> </ion-textarea>\n            </ion-item>\n              \n            <ion-item>\n              <button ion-button (click)="capture(1)">Lets take a picture!</button>\n\n              <button ion-button (click)="capture(0)">gallerie</button>\n\n              <ion-row *ngIf="captureDataUrl">\n                <ion-slides zoom="true" pager>\n                  <ion-slide *ngFor="let img of captureDataUrl">\n                    <img src="{{img}}">\n                  </ion-slide>\n                </ion-slides>\n            </ion-row>\n            \n          </ion-item>\n  \n            <ion-item>\n                <button (click)="publierAnnonce(annonce)" ion-button round>Publier</button>\n            </ion-item>\n          </ion-list>\n    </ion-card-content>\n  </ion-card>\n  </ion-content>\n'/*ion-inline-end:"/home/anwar/pfeHanimo/src/pages/annonce-a1/annonce-a1.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_3__providers_annonce_crud_annonce_crud__["a" /* AnnonceCrudProvider */],
            __WEBPACK_IMPORTED_MODULE_4__providers_usercrud_usercrud__["a" /* UsercrudProvider */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_native_geocoder__["a" /* NativeGeocoder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_diagnostic__["a" /* Diagnostic */]])
    ], AnnonceA1Page);
    return AnnonceA1Page;
}());

//# sourceMappingURL=annonce-a1.js.map

/***/ }),

/***/ 172:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__messaging_modal_messaging_modal__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MessagesPage = (function () {
    function MessagesPage(navCtrl, navParams, modalCtrl, afDatabase, afAuth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.afDatabase = afDatabase;
        this.afAuth = afAuth;
        this.choix = "messages";
        this.currentUser = {};
        this.messageList = [];
    }
    MessagesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MessagesPage');
    };
    MessagesPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.afAuth.auth.onAuthStateChanged(function (user) {
            if (user) {
                _this.currentUser.id = user.uid;
                console.log(_this.currentUser.id);
                _this.getMessagesList();
            }
            else {
                console.log("Erreur de chargement");
            }
        });
    };
    MessagesPage.prototype.getMessagesList = function () {
        var _this = this;
        var Smessages = this.afDatabase.list("/conversations/" + this.currentUser.id).valueChanges().subscribe(function (data) {
            console.log(data);
            _this.messageList = [];
            data.forEach(function (element) {
                var message = element;
                _this.afDatabase.database.ref("/users/" + message.userId).once("value", function (snapshots) {
                    message.displayName = snapshots.val().displayName;
                    message.avatar = snapshots.val().imageUrl;
                    console.log(message);
                }); //end of recupering user
                _this.messageList.push(message);
                console.log(_this.messageList);
            }); //end of Foreach
        }); //end of Smessages
    };
    MessagesPage.prototype.goToMessage = function (friendId) {
        var messageModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__messaging_modal_messaging_modal__["a" /* MessagingModalPage */], {
            "currentUser": this.currentUser.id,
            "friendId": friendId
        });
        messageModal.present();
        this.afDatabase.database.ref("/conversations/" + this.currentUser.id + "/" + friendId).update({
            seen: __WEBPACK_IMPORTED_MODULE_5_firebase___default.a.database.ServerValue.TIMESTAMP
        });
    };
    MessagesPage.prototype.verifSeenMessage = function (message) {
        if (message.sender == true) {
            //afficher Vous : displayName
            return 1;
        }
        else if (message.sender == false && !message.seen) {
            //Message Non vue
            return 2;
        }
        else if (message.sender == false) {
            //Rien
            return 3;
        }
    };
    MessagesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-messages',template:/*ion-inline-start:"/home/anwar/pfeHanimo/src/pages/messages/messages.html"*/'<ion-header>\n  <ion-navbar  color="primary">\n      <button ion-button icon-only menuToggle  >\n          <ion-icon name="menu"></ion-icon>\n        </button>\n    <ion-title>Messages</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <div padding>\n    <ion-segment [(ngModel)]="choix">\n      <ion-segment-button value="messages">\n        Messages\n      </ion-segment-button>\n      <ion-segment-button value="amis">\n        Amis connectés\n      </ion-segment-button>\n    </ion-segment>\n  </div>\n\n  <div [ngSwitch]="choix">\n    <ion-list *ngSwitchCase="\'messages\'">\n\n      <!-- Afficher messages  -->\n\n    <ion-item-sliding>\n          <!-- First User -->\n      <ion-item *ngFor="let message of messageList" (click)="goToMessage(message.userId)" >\n          <ion-thumbnail item-start>\n            <ion-avatar item-start>\n              <img src="{{message.avatar}}">\n            </ion-avatar>\n          </ion-thumbnail>\n            <h2>{{message.displayName}}</h2>\n            <p *ngIf="verifSeenMessage(message) == 1">Vous: {{message.content}}</p>\n            <p *ngIf="verifSeenMessage(message) == 3" >{{message.content}}</p>\n            <p *ngIf="verifSeenMessage(message) == 2" style="font-weight: bold;" >{{message.content}}</p>\n        </ion-item>\n      </ion-item-sliding>\n    </ion-list>\n      \n  \n    <ion-list *ngSwitchCase="\'amis\'">\n\n      <!-- Afficher Liste Amis en ligne -->\n\n      <ion-list>\n          <ion-item>\n            <ion-avatar item-start>\n              <img src="assets/imgs/hanimo-logo.png">\n            </ion-avatar>\n            <h2>Hamza Ben Romdhane</h2>\n          </ion-item>\n        </ion-list>\n\n    </ion-list>\n        \n  </div>\n\n    \n</ion-content>'/*ion-inline-end:"/home/anwar/pfeHanimo/src/pages/messages/messages.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], MessagesPage);
    return MessagesPage;
}());

//# sourceMappingURL=messages.js.map

/***/ }),

/***/ 173:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagingModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var MessagingModalPage = (function () {
    function MessagingModalPage(navCtrl, navParams, camera, viewController, afDatabase, afAuth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.camera = camera;
        this.viewController = viewController;
        this.afDatabase = afDatabase;
        this.afAuth = afAuth;
        this.discussion = [];
        this.friendUser = {};
        this.imageMessage = null;
        this.imageDownloadUrl = null;
    }
    MessagingModalPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.currentUserId = this.navParams.get("currentUser");
        console.log("currentUserId : ", this.currentUserId);
        this.friendId = this.navParams.get("friendId");
        console.log("friendId : ", this.friendId);
        this.afDatabase.database.ref("/users/" + this.friendId).once("value", function (snapshots) {
            _this.friendUser = snapshots.val();
            console.log(_this.friendUser);
        });
        this.getMessages(this.friendId);
    };
    MessagingModalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MessagingModalPage');
    };
    MessagingModalPage.prototype.getMessages = function (userId) {
        var _this = this;
        var myMessages = [];
        this.afDatabase.list("/discussions/" + this.currentUserId + "/" + userId).valueChanges()
            .subscribe(function (data) {
            myMessages = data;
            console.log(myMessages);
            var hisMessages = [];
            _this.afDatabase.list("/discussions/" + userId + "/" + _this.currentUserId).valueChanges()
                .subscribe(function (data2) {
                _this.discussion = myMessages.concat(data2);
                _this.discussion.sort(function (a, b) {
                    return a.date - b.date;
                });
                console.log(_this.discussion);
            });
        });
    };
    MessagingModalPage.prototype.sendMessage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var newRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("message to : ", this.friendId);
                        newRef = this.afDatabase.list('/discussions/' + this.currentUserId + "/" + this.friendId).push({});
                        return [4 /*yield*/, this.uploadImageMessage(this.imageMessage, newRef.key).then(function () {
                                newRef.set({
                                    senderId: _this.currentUserId,
                                    messageKey: newRef.key,
                                    attachement: _this.imageDownloadUrl,
                                    content: _this.message,
                                    date: __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database.ServerValue.TIMESTAMP
                                }).then(function () {
                                    //that thing goes here
                                    _this.afDatabase.list("/conversations/" + _this.currentUserId).set(_this.friendId, {
                                        userId: _this.friendId,
                                        attachement: _this.imageDownloadUrl,
                                        content: _this.message,
                                        date: __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database.ServerValue.TIMESTAMP,
                                        sender: true
                                    });
                                    _this.afDatabase.list("/conversations/" + _this.friendId).set(_this.currentUserId, {
                                        userId: _this.currentUserId,
                                        attachement: _this.imageDownloadUrl,
                                        content: _this.message,
                                        date: __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database.ServerValue.TIMESTAMP,
                                        sender: false
                                    });
                                    _this.message = "";
                                    _this.imageMessage = null;
                                });
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    MessagingModalPage.prototype.addAttachement = function () {
        console.log("add attachement ...");
    };
    MessagingModalPage.prototype.goBack = function () {
        this.viewController.dismiss();
    };
    MessagingModalPage.prototype.capture = function (sourceType) {
        var _this = this;
        console.log("cameraaaaaaaa capture");
        var cameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: sourceType,
            allowEdit: true,
            correctOrientation: true
        };
        this.camera.getPicture(cameraOptions).then(function (imageData) {
            console.log(imageData);
            var dataUrl = 'data:image/jpeg;base64,' + imageData;
            _this.imageMessage = dataUrl;
            console.log(_this.imageMessage);
        }, function (err) {
            console.log(err);
        });
    };
    MessagingModalPage.prototype.uploadImageMessage = function (captureDataUrl, messageKey) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var storageRef, filename, imageRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!captureDataUrl) return [3 /*break*/, 3];
                        return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.storage().ref("messagesImages/")];
                    case 1:
                        storageRef = _a.sent();
                        filename = messageKey + ".jpg";
                        imageRef = storageRef.child(filename);
                        return [4 /*yield*/, imageRef.putString(captureDataUrl, __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.storage.StringFormat.DATA_URL).then(function (snap) {
                                _this.imageDownloadUrl = snap.downloadURL;
                                console.log(_this.imageDownloadUrl);
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Content */])
    ], MessagingModalPage.prototype, "content", void 0);
    MessagingModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-messaging-modal',template:/*ion-inline-start:"/home/anwar/pfeHanimo/src/pages/messaging-modal/messaging-modal.html"*/'\n<ion-header>\n  <ion-navbar>\n      <ion-buttons start>\n          <button ion-button (click)="goBack()">\n              Retour\n          </button>\n      </ion-buttons>\n      <ion-title> {{friendUser.displayName}}</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <div id="chatMessages">\n    <div *ngFor="let message of discussion">\n      <div [class]="message.senderId == currentUserId ? \'innerMessage messageRight\' : \'innerMessage messageLeft\'">\n        <div class="username">{{ message.senderId}}</div>\n        <div class="messageContent">{{ message.content }}</div>\n        <div *ngIf="message.attachement"><img style="width: 100px; height: 100px;" src="{{message.attachement}}" > </div>\n      </div>\n    </div>\n  </div>\n\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n    <div id="footer">\n      <div class="elem"><ion-input type="text" [(ngModel)]="message"></ion-input>\n        \n        \n\n      </div>\n      \n      <div class="elem">\n        <button ion-button icon-only (click)="capture(1)">  \n          <ion-icon name="ios-camera-outline"></ion-icon>\n        </button>\n      </div>\n\n      <div class="elem"><button ion-button icon-only (click)="sendMessage()"><ion-icon name="send"></ion-icon> </button></div>\n    </div>\n\n    <ion-thumbnail *ngIf="imageMessage">\n      <img style="width: 100px; height: 100px;" src="{{imageMessage}}">\n    </ion-thumbnail>\n\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/home/anwar/pfeHanimo/src/pages/messaging-modal/messaging-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], MessagingModalPage);
    return MessagingModalPage;
}());

//# sourceMappingURL=messaging-modal.js.map

/***/ }),

/***/ 174:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InvitationPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase_app__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_usercrud_usercrud__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var InvitationPage = (function () {
    function InvitationPage(navCtrl, navParams, userProvider, storage, afDatabase, afAuth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userProvider = userProvider;
        this.storage = storage;
        this.afDatabase = afDatabase;
        this.afAuth = afAuth;
        this.currentUser = {};
        this.invitations = [];
        this.users = [];
        this.invitationsRef = this.afDatabase.database.ref('/invitations/');
        /* this.afAuth.auth.onAuthStateChanged(user => {
          if(user){
            this.currentUser.id = user.uid;
            this.initilizeInvitationsList();
            console.log(this.currentUser.id);
          }else{
            console.log("Erreur de chargement");
          }
        }); */
    }
    /*   loadPage() {
        
        this.afDatabase.database.ref("/invitations/").orderByChild("idReceiver").equalTo(this.currentUser.id)
          .on("value",data=>{
            this.invitations = data;
            console.log(this.invitations.val());
            this.invitations.forEach(element => {
              console.log(element.val().idSender);
              this.getUsers(element.val().idSender,element.val().key);
            });
            console.log(this.users);
          });
      } */
    InvitationPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.afAuth.auth.onAuthStateChanged(function (user) {
            if (user) {
                _this.currentUser.id = user.uid;
                _this.initilizeInvitationsList();
                console.log(_this.currentUser.id);
            }
            else {
                console.log("Erreur de chargement");
            }
        });
    };
    InvitationPage.prototype.initilizeInvitationsList = function () {
        var _this = this;
        this.invitationsRef
            .orderByChild("idReceiver").equalTo(this.currentUser.id).on("value", function (invitSnapshot) {
            console.log("usersnapshot : " + invitSnapshot.val());
            _this.users = [];
            invitSnapshot.forEach(function (invitNap) {
                var invit = invitNap.val();
                console.log(invit);
                _this.afDatabase.database.ref("/users/" + invit.idSender).once("value", function (userSnap) {
                    invit.displayName = userSnap.val().displayName;
                    invit.imageUrl = userSnap.val().imageUrl;
                    console.log(invit);
                    _this.users.push(invit);
                });
                //this.invitations.push(invitNap.val());
                return false;
            });
            _this.users.sort(function (a, b) {
                return a.date - b.date;
            });
        });
    };
    InvitationPage.prototype.getUsers = function (idUser, invitId) {
        var _this = this;
        this.afDatabase.database.ref("/users/" + idUser).once("value", function (data) {
            var invit = {};
            invit = data.val();
            invit.key = invitId;
            _this.users.push(invit);
            console.log(invit);
        });
    };
    InvitationPage.prototype.acceptInvitation = function (userId, key) {
        var friendRef = this.afDatabase.list('/friends/').push({});
        friendRef.set({
            key: friendRef.key,
            id1: userId,
            id2: this.currentUser.id,
            date: __WEBPACK_IMPORTED_MODULE_5_firebase_app__["database"].ServerValue.TIMESTAMP
        });
        this.afDatabase.list('/invitations/').remove(key);
        this.users = [];
    };
    InvitationPage.prototype.declineInvitation = function (key) {
        this.afDatabase.list('/invitations/').remove(key);
    };
    InvitationPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-invitation',template:/*ion-inline-start:"/home/anwar/pfeHanimo/src/pages/invitation/invitation.html"*/'<ion-header>\n  <ion-navbar>\n      <button ion-button icon-only menuToggle  >\n          <ion-icon name="menu"></ion-icon>\n        </button>\n    <ion-title>\n      Invitations\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <ion-list *ngIf="users" >\n\n        <ion-item  *ngFor="let user of users">\n          <ion-thumbnail item-start>\n            <img src="{{user.imageUrl}}">\n          </ion-thumbnail>\n          <h2>{{user.displayName}} </h2>\n          <button (click)="acceptInvitation(user.idSender,user.key)" ion-button clear item-end>Accept</button>\n          <button (click)="declineInvitation(user.key)" ion-button clear item-end>Decline</button>\n        </ion-item>\n    \n      </ion-list>\n</ion-content>'/*ion-inline-end:"/home/anwar/pfeHanimo/src/pages/invitation/invitation.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_6__providers_usercrud_usercrud__["a" /* UsercrudProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], InvitationPage);
    return InvitationPage;
}());

//# sourceMappingURL=invitation.js.map

/***/ }),

/***/ 187:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 187;

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsercrudProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var UsercrudProvider = (function () {
    function UsercrudProvider(http, afDatabase) {
        this.http = http;
        this.afDatabase = afDatabase;
        console.log('Hello UsercrudProvider Provider');
    }
    UsercrudProvider.prototype.addUser = function (user) {
        var _this = this;
        var usersRef = this.afDatabase.database.ref("/users/" + user.id);
        usersRef.once("value", function (snap) {
            console.log(snap.val());
            if (snap.val()) {
                console.log("user exists from provider");
            }
            else {
                console.log("user NOT exists from provider");
                console.log(user);
                user.reputation = 1;
                _this.afDatabase.list('/users/').set(user.id, user).then(function (res) {
                    console.log(res);
                });
            }
        });
    };
    UsercrudProvider.prototype.completeProfile = function (user) {
        this.afDatabase.database.ref('/users/' + user.id).update(user).then(function (res) {
            console.log("updating data");
            console.log(res);
        });
    };
    UsercrudProvider.prototype.findUserbyId = function (idUser) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.afDatabase.database.ref("/users/" + idUser).on("value", function (snap) {
                            console.log(snap.val());
                            /*console.log(snap.val());
                            return snap.val();*/
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UsercrudProvider.prototype.sendInvitation = function (invitation) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ref;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.afDatabase.database.ref('/invitations/')];
                    case 1:
                        ref = _a.sent();
                        ref.push(invitation).then(function (res) {
                            console.log(res.key);
                            var key = res.key;
                            invitation.invitId = key;
                            _this.afDatabase.database.ref('/invitations/' + invitation.invitId).update(invitation).then(function (res) {
                                console.log("finished adding invtation");
                                console.log(res);
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    UsercrudProvider.prototype.acceptInvitation = function (friend) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ref;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.afDatabase.database.ref('/friends/')];
                    case 1:
                        ref = _a.sent();
                        ref.push(friend).then(function (res) {
                            console.log(res.key);
                            var key = res.key;
                            friend.friendId = key;
                            _this.afDatabase.database.ref('/friends/' + friend.friendId).update(friend).then(function (res) {
                                console.log("finished adding friends");
                                console.log(res);
                                _this.afDatabase.database.ref("/invitations/").orderByChild("receiverId").equalTo(friend.receiverId)
                                    .on("value", function (invitSnapShot) {
                                    invitSnapShot.forEach(function (invitSnap) {
                                        console.log();
                                        if (invitSnap.val().senderId == friend.senderId) {
                                            _this.afDatabase.database.ref("/invitations/").child(invitSnap.val().invitId).remove().then(function (res) {
                                                console.log("invitation deleted : " + res);
                                            });
                                        }
                                        ;
                                        return false;
                                    });
                                });
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    UsercrudProvider.prototype.declineInvitation = function (friend) {
        var _this = this;
        this.afDatabase.database.ref("/invitations/").orderByChild("receiverId").equalTo(friend.receiverId)
            .on("value", function (invitSnapShot) {
            invitSnapShot.forEach(function (invitSnap) {
                console.log();
                if (invitSnap.val().senderId == friend.senderId) {
                    _this.afDatabase.database.ref("/invitations/").child(invitSnap.val().invitId).remove().then(function (res) {
                        console.log("invitation deleted : " + res);
                    });
                }
                ;
                return false;
            });
        });
    };
    UsercrudProvider.prototype.updateReputation = function (userId, value) {
        var _this = this;
        this.afDatabase.database.ref("/users/" + userId).once("value", function (snapShot) {
            value = value + snapShot.val().reputation;
            _this.afDatabase.database.ref("/users/" + userId).update({ reputation: value }).then(function (res) {
                console.log("updating reputation from provider " + res);
            });
        });
    };
    UsercrudProvider.prototype.updateUserPosition = function (userId, value) {
        var _this = this;
        var usersRef = this.afDatabase.database.ref("/users/" + userId);
        usersRef.once("value", function (snap) {
            if (snap.val()) {
                _this.afDatabase.database.ref("/users/" + userId).update({
                    currentPositionLat: value.latitude,
                    currentPositionLng: value.longitude,
                }).then(function (res) {
                    console.log("updating position from provider " + res);
                });
            }
        });
    };
    UsercrudProvider.prototype.updateUserProfile = function (user) {
        this.afDatabase.database.ref("/users/" + user.id).update(user);
    };
    UsercrudProvider.prototype.uploadProfilePicture = function (imgDataUrl, idUser) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var storageRef, filename, imageRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.storage().ref("profileImages/")];
                    case 1:
                        storageRef = _a.sent();
                        filename = idUser + ".jpg";
                        imageRef = storageRef.child(filename);
                        return [4 /*yield*/, imageRef.putString(imgDataUrl, __WEBPACK_IMPORTED_MODULE_2_firebase___default.a.storage.StringFormat.DATA_URL).then(function (snap) {
                                console.log("image added : " + snap);
                                console.log(snap);
                                _this.afDatabase.database.ref("/users/" + idUser).update({
                                    imageUrl: snap.downloadURL
                                });
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UsercrudProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], UsercrudProvider);
    return UsercrudProvider;
}());

//# sourceMappingURL=usercrud.js.map

/***/ }),

/***/ 229:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 229;

/***/ }),

/***/ 340:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_usercrud_usercrud__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_first_connection_first_connection__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(165);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var SignupPage = (function () {
    function SignupPage(navCtrl, navParams, afAuth, userCrudProvider, menu) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afAuth = afAuth;
        this.userCrudProvider = userCrudProvider;
        this.menu = menu;
        this.user = {};
        this.user.connectionType = "mail";
    }
    SignupPage.prototype.register = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(function (res) {
                                console.log(res);
                                if (res) {
                                    console.log("resultat : ");
                                    console.log(res);
                                    console.log("id :::::: ");
                                    console.log(res.uid);
                                    user.id = res.uid;
                                    user.reputation = 1;
                                    user.imageUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAM1BMVEUKME7///+El6bw8vQZPVlHZHpmfpHCy9Ojsbzg5ekpSmTR2N44V29XcYayvsd2i5yTpLFbvRYnAAAJcklEQVR4nO2d17arOgxFs+kkofz/154Qmg0uKsuQccddT/vhnOCJLclFMo+//4gedzcApf9B4srrusk+GsqPpj+ypq7zVE9LAdLWWVU+Hx69y2FMwAMGyfusLHwIpooyw9IAQfK+8naDp3OGHvZ0FMhrfPMgVnVjC2kABOQ1MLvi0DEIFj1ILu0LU2WjNRgtSF3pKb4qqtd9IHmjGlJHlc09IHlGcrQcPeUjTAySAGNSkQlRhCCJMGaUC0HSYUx6SmxFAtJDTdylsr4ApC1TY0yquKbCBkk7qnYVzPHFBHkBojhVJWviwgPJrsP4qBgTgbQXdsesjm4pDJDmIuswVZDdFx0ENTtkihoeqSDXD6tVxOFFBHndMKxWvUnzexpIcx/Gg2goJJDhVo6PCMGRAnKTmZuKm3wcJO/upphUqUHy29yVrRhJDORXOKIkEZDf4YiRhEF+iSNCEgb5KY4wSRDkB/yurUEG8nMcocgYABnvbrVL3nMIP0h/d5udKnwzSC/InfPdkJ6eWb0PJE++dyVVyQP5iQmWW27X5QG5druEKafBu0Hqu9saVOHa8HKC/K6BzHKZiRMEZCDF0Nd1/ZfXI/fcOibHOssFgokg9uFA20BhztHEAZIjIohrD/o1wljeFBDEwBo8YUt5Ir/rNLjOIACPFdy/AbEcPdcJBOCxytjeYAM4Kzp6rhOIPhRGNzwmFP3rOoTFI0irtnQKx6fj1Zt+h9njEUS9mKJxfFRrX5lt7wcQtaWTOfTHeIXVJQcQrRW+OYex2j0a66XZINoO8a7fPH2iHF2mC7ZBtB3Czb5QvjizSx7A3308mRzqAwujSywQbYfwc0iU8zqjS0yQ6ztEHX9332KCaGNIYB/Qq1z3yN0oDZBWyeFYJBCkm2sXLhDtpKFwNDMu5TnrZpYGiHbK4Nlwikg5DrYV1g6iPoJmzE5MKd/fOp53EPUaQZaLqH3u+vo2ELWp3wSyWuYGoj9EEIJoV3L9AUS/ZLsJpLNBXmqOu0CW6P5A/dx9IL0FAji/FYKot9EqE0Tvs6QBUe/2CxMEkZAlBNGPhdoAQWyTSmbxUwvUygwQyMmniAPgLt87CODXHuftWJIQgzrfQDC5AfwSgz9MmmG/gWCOqDgZ4JsQeTvZBoJJDhAFEsSDyxUEEUUekk0UEMhjBcEcGsoWVpBU3NcCgkkPkJWrKbdRZvULCMTWhYEdMrayBQRyqHcnSLmAIH7LcWJ8Hch7BsHEdWFpJsZjziCgFBpZ9TPm4e0XBJTTJKt9xjy8RoLI4gimPLP5goCSgWTrEcyzsy8IqmZVMo0H5bJiQToBCOjZ5RcElhjLN3dU7uQMAvoxwQkJZKI1CQzCthJYEigahHuDDi4rFwzCPQ7F1fiDQZgTR5iJwEGYRgIsiECD8BwwMAEfDcIaW8CRBQdhjS1kJQEchDEFhiRKr4KDFPS9FGQNVwEHoW83QjsEHdkfnuIOl6C1NjMItiaCaCWgbdpFJXQ9soh2uoB9aJcCxFdgZwlcrTmvENGlrITBBdpK25Qhd1F2RScq8CKu/gsCL8qN5THjy+Rr5E6joYgPxpdl518QrCf8Kpgjn6C8HLkbb+vt7ZM8wdVvy258khsRfHaS5DalDnlidZT7Erk+SXV5Bj1D3LS29XyhVJuoKHs9Q8S6reK11oUc7vPcr9uswP3SLiDINefXOF5rwCuGzVT6zVkVPfh2wWmHcz4wAwba2cgN1/Tsvleu7//i69CgVyt1GwjOs2+XK3rtbl151Tg3vOeioG40Mz2V+6pQ4xbJHOZj6g0EMxk93tV7fuedvVZpQSPhbwNBGInrymGrwNh1GXmL8F+lAaJ+NU/fzcmvJqvKj7177+1v1GY/GiBKI1Fdy/2XK6upXwaIJpI8B/399W0mH9zzafKaeCF9J0WF+jyCuFusTGzZKhFH8dVLZql2brxgcdVBKb7KG/7UZTmB3XJ6uL/QYT5ScRI74FcHEJ7feopyfGkaeaGlPoCw/BbjZmSBWIvINQNmTxdjWJqwUI8sztR4nYPuIPSTSUnOCZOE3ierqRoJfNSQxDjLEYs8i91eqgFCDSWiFHiuqAN9CwEGCPEISVjvwhS7Mfx6dtX8kC5aqvneGBOEFN2v6RBiYwr3DQOkLhEW6fHFbIwFQnkLiWYmZxE220z/aedPx99C+hiyKR4OzNFhg8S75CJTnxQ1dyugHTLaY10iu9dBpmhQtMz1ABLrkgtHVnRsPUO3OcU25i8cWdGxZbflCBKJqBdMs3aF/dYhNexU9RFcYEmLXYQKghyWdufyldBSU3KpjkKhZclxTXQGCTkL/HZDUIH5+Gkt4SgoCtj7pSYSNJLTK3VVRnmXZxebSMBIzmHABeIdXBebiN9eHYtUZ62ab3BdGkUm+SKJw1bdRXeewaX7qqdAnljg2sVxg3guAk3baofcg9yZ2eZpnHNvSFrEqhB9YPjesmt0pt6Xc8hl7W5L9Q4Xx09ctsrd5VhWeF6nF8SRrZdw49qns//0xTK/AZ8vGr3caTliuzeFNeCJTgafpKlhHd2WP1sy1LqDF798gjKJPLqDr9keoTd43+NyNzC1CI8Xy2lcPtOaVBI5IiAWyQ3e125AcKoXs2Djhy5eVc3KiBxREIPkhjBiLhIjU++4T91IbggjRiCJLSEIwWGddkEaxlVN5KCArPHk8mXVpHk8FHH7JL3n5dPA7C90q7XkeFJucacNmGXeRfswLE71HA79efaGiCN/Ofjmfmtcp8X10tIsqCacV5xfRWjNUiXGYbovWgyFYHcQLak15K9oM5zqmgaeKsHJetbSHfSPzXOiw/rxE9YH4CXaUpsZ0ztemFurP95Jpyvrd29YTpIZr7cEJHqfc7Wl0PFm2+yJR70udaokKFtGPTdm8WdQe24+HmVLlueboWQquBcYYVH2vEzfh8kCks1p90eWsLCyZ8qK7E86Oe+3XYFnBuiWdth20UqZR5SvMoyPg3WNauJipi0LMTQgVq5xUUlZcrPsopPHJ926z8pm7xyFLrH/PxpHSoXKdWgXsLn1scZn1ZDd/2vszN3lt254qkE+qu3yoqLM+ghN3Qz2qcVzUC/ZMFsK/alU6l0OWV/bQz6v6yYbyuN5BaZ4A7Y30vs/PPksS2+qzlvfF7OQmzzcL7W+xa7OIfRuVdtn/tdvdFLnL4OTKcm2W16PmWc4FWWXNSlWM2n3D+uPxuyrcfo74aP+Ac30a82+oLmfAAAAAElFTkSuQmCC";
                                    console.log(user);
                                    _this.userCrudProvider.addUser(user);
                                    var userSign = _this.afAuth.auth.signInWithEmailAndPassword(_this.user.email, _this.user.password);
                                    console.log(userSign);
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__pages_first_connection_first_connection__["a" /* FirstConnectionPage */]);
                                }
                            })];
                    case 1:
                        result = _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.log("erreur");
                        console.log(error_1.message);
                        alert(error_1.message);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SignupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignupPage');
    };
    SignupPage.prototype.ionViewDidEnter = function () {
        this.menu.swipeEnable(false);
    };
    SignupPage.prototype.ionViewWillLeave = function () {
        this.menu.swipeEnable(true);
    };
    SignupPage.prototype.goToLoginPage = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"/home/anwar/pfeHanimo/src/pages/signup/signup.html"*/'<ion-content class="background">\n\n  <ion-content class="background">\n    <ion-grid>\n      <ion-row >\n        <ion-col>\n            <ion-img width="70" height="70" src="../../assets/imgs/logo.png"></ion-img>\n        </ion-col>\n      </ion-row>\n      <ion-row >\n          <ion-col>\n            <div class="title-logo">\n              Hanimo\n            </div>\n          </ion-col>\n        </ion-row>\n      <ion-row>\n        <ion-col>\n            <p> Créez votre compte | <a (click)="goToLoginPage()"> Me Connecter</a></p>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col >\n            <ion-input  type="text" placeholder="Prénom"  [(ngModel)]="user.prenom"></ion-input>\n        </ion-col>\n        <ion-col>\n            <ion-input type="text" placeholder="Nom" [(ngModel)]="user.nom" ></ion-input>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <ion-input type="text" placeholder="Pseudo" [(ngModel)]="user.displayName"  ></ion-input>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <ion-input type="text" placeholder="Votre email" [(ngModel)]="user.email"  ></ion-input>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <ion-input type="password" placeholder="Mot de passe"  [(ngModel)]="user.password"  ></ion-input>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <ion-input type="password" placeholder="Confirmation de mot de passe"  [(ngModel)]="verifPassword"  ></ion-input>\n        </ion-col>\n      </ion-row>\n      <ion-row >\n          <ion-col>\n              <button class="login-button flat" ion-button block  (click)="register(user)" >CREER MON COMPTE</button>\n          </ion-col>\n      </ion-row>\n    </ion-grid>\n  </ion-content>\n  </ion-content>\n\n\n<!-- \n  <ion-grid>\n    <ion-row>\n      <ion-col >\n        <ion-item>\n          <ion-avatar class="center" >\n            <ion-icon name="ios-people"></ion-icon>\n            <img src="assets/imgs/edit-profile.png">\n          </ion-avatar>\n        </ion-item>\n          </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n          <ion-item>\n              <ion-label floating>Nom</ion-label>\n              <ion-input type="text" ></ion-input>\n          </ion-item>\n  \n          <ion-item>\n              <ion-label floating>Prénom</ion-label>\n              <ion-input type="text" ></ion-input>\n          </ion-item> \n           <ion-item>\n            <ion-label floating>Pseudo</ion-label>\n            <ion-input type="text"></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label floating>Adresse E-mail</ion-label>\n                <ion-input type="text" ></ion-input>\n            </ion-item>\n            <ion-item>\n                <ion-label floating>Mot de passe</ion-label>\n                <ion-input type="password"></ion-input>\n            </ion-item>\n\n          <ion-item>\n              <ion-label floating>confirmer le mot de passe</ion-label>\n              <ion-input type="password"></ion-input>\n          </ion-item>\n  \n          \n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col class="connecter" >      \n            <button class="login-button" ion-button color="sandy-brown"  (click)="register(user)" >S\'inscrire</button>\n            \n            \n      </ion-col>\n    </ion-row>\n    </ion-grid> -->\n\n'/*ion-inline-end:"/home/anwar/pfeHanimo/src/pages/signup/signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_3__providers_usercrud_usercrud__["a" /* UsercrudProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* MenuController */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FirstConnectionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__complete_profile_complete_profile__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs_tabs__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var FirstConnectionPage = (function () {
    function FirstConnectionPage(navCtrl, navParams, afAuth, afDatabase) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afAuth = afAuth;
        this.afDatabase = afDatabase;
        this.user = {};
        this.afAuth.auth.onAuthStateChanged(function (user) {
            if (user) {
                console.log('auth state changed');
                console.log(user);
            }
            else {
                console.log("auth state changed erru");
            }
        });
        console.log(this.navParams.get("userId"));
        this.user.id = this.navParams.get("userId");
        console.log("user id : " + this.user.id);
    }
    FirstConnectionPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad FirstConnectionPage');
    };
    FirstConnectionPage.prototype.goToCompleteProfile = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__complete_profile_complete_profile__["a" /* CompleteProfilePage */]);
    };
    FirstConnectionPage.prototype.skipToHome = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */]);
    };
    FirstConnectionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-first-connection',template:/*ion-inline-start:"/home/anwar/pfeHanimo/src/pages/first-connection/first-connection.html"*/'<ion-content>\n  <ion-card class="card">\n      <img class="avatar" src="assets/imgs/defaultAvatar.png"/>\n      <ion-card-content class="card-content">\n          <ion-card-title>\n              Hamza Ben Romdhane \n          </ion-card-title>\n          <button (click)="goToCompleteProfile()" ion-button color="secondary" block icon-left>\n              Completer vos informations de profil\n          </button>\n          <button (click)="skipToHome()" ion-button color="light">Passer</button>\n      </ion-card-content>\n    </ion-card>\n</ion-content>'/*ion-inline-end:"/home/anwar/pfeHanimo/src/pages/first-connection/first-connection.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], FirstConnectionPage);
    return FirstConnectionPage;
}());

//# sourceMappingURL=first-connection.js.map

/***/ }),

/***/ 342:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompleteProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_usercrud_usercrud__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CompleteProfilePage = (function () {
    function CompleteProfilePage(navCtrl, navParams, afAuth, usercrudProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afAuth = afAuth;
        this.usercrudProvider = usercrudProvider;
        this.user = {};
    }
    CompleteProfilePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad CompleteProfilePage');
        this.afAuth.auth.onAuthStateChanged(function (res) {
            if (res) {
                console.log('auth state changed');
                console.log(res);
                _this.user.id = res.uid;
            }
            else {
                console.log("auth state changed erru");
            }
        });
    };
    CompleteProfilePage.prototype.completeProfile = function (user) {
        console.log("Complete Profile");
        console.log(user);
        console.log(this.user);
        this.usercrudProvider.completeProfile(user);
    };
    CompleteProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-complete-profile',template:/*ion-inline-start:"/home/anwar/pfeHanimo/src/pages/complete-profile/complete-profile.html"*/'<ion-content>\n  <ion-card class="card">\n\n      <h1 ion-text>Completer les informations de votre profil</h1>\n      <img class="avatar" src="assets/imgs/defaultAvatar.png" />\n      <ion-card-content class="card-content">\n          <ion-card-title>\n              Hamza Ben Romdhane \n          </ion-card-title>\n\n          <ion-list>\n\n              <ion-item>\n                  <ion-label stacked>Numero de telephone</ion-label>\n                  <ion-input type="tel" [(ngModel)]="user.numTel" ></ion-input>\n              </ion-item>\n              <ion-item>\n                  <ion-label stacked>ou habiter vous</ion-label>\n                  <ion-input type="text" [(ngModel)]="user.habiter" ></ion-input>\n              </ion-item>\n              <ion-item>\n                  <ion-label stacked>Date de naissance</ion-label>\n                  <ion-datetime displayFormat="MM/DD/YYYY" [(ngModel)]="user.naissanceDate"></ion-datetime>\n              </ion-item>\n\n              <ion-item>\n                  <ion-label stacked>Sexe</ion-label>\n                  <ion-input type="text" [(ngModel)]="user.sexe" ></ion-input>\n              </ion-item>\n\n              <ion-item>\n                  <button (click)="completeProfile(user)" ion-button block outline>Completer</button>\n              </ion-item>\n          </ion-list>\n\n      </ion-card-content>\n    </ion-card>\n\n\n  \n</ion-content>'/*ion-inline-end:"/home/anwar/pfeHanimo/src/pages/complete-profile/complete-profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_3__providers_usercrud_usercrud__["a" /* UsercrudProvider */]])
    ], CompleteProfilePage);
    return CompleteProfilePage;
}());

//# sourceMappingURL=complete-profile.js.map

/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__messages_messages__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__poster_poster__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__invitation_invitation__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TabsPage = (function () {
    function TabsPage(navCtrl, navParams, afDatabase) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afDatabase = afDatabase;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_3__messages_messages__["a" /* MessagesPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_4__poster_poster__["a" /* PosterPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_5__invitation_invitation__["a" /* InvitationPage */];
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */] },
            { title: 'Messages', component: __WEBPACK_IMPORTED_MODULE_3__messages_messages__["a" /* MessagesPage */] },
            { title: 'Poster', component: __WEBPACK_IMPORTED_MODULE_4__poster_poster__["a" /* PosterPage */] },
            { title: 'Invitations', component: __WEBPACK_IMPORTED_MODULE_5__invitation_invitation__["a" /* InvitationPage */] }
        ];
    }
    TabsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TabsPage');
    };
    TabsPage.prototype.openPage = function (p) {
        this.navCtrl.setRoot(p);
    };
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-tabs',template:/*ion-inline-start:"/home/anwar/pfeHanimo/src/pages/tabs/tabs.html"*/'<!-- <ion-menu [content]="content" >\n  <ion-header  >\n    <ion-toolbar  color="primary" >\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n        \n        <ion-list no-lines>\n                <ion-item>\n                  <ion-avatar item-start>\n                    <img src="./../assets/imgs/avatar.jpg">\n                  </ion-avatar><br>\n                  \n                </ion-item>\n                <ion-item>\n                    <h2> Username</h2>\n                </ion-item>\n          </ion-list>\n       <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p.component)">\n        \n        {{p.title}} \n      </button> \n    </ion-list>\n  </ion-content>\n\n</ion-menu> -->\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Accueil" tabIcon="ios-home-outline"></ion-tab>\n<!--   <ion-tab [root]="tab2Root" tabTitle="Messages" tabIcon="ios-chatboxes-outline"></ion-tab> -->\n  <ion-tab [root]="tab3Root" tabTitle="Poster" tabIcon="ios-create-outline"></ion-tab>\n<!--   <ion-tab [root]="tab4Root" tabTitle="Invitation" tabIcon="ios-person-add-outline"></ion-tab> -->\n</ion-tabs>'/*ion-inline-end:"/home/anwar/pfeHanimo/src/pages/tabs/tabs.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_6_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 344:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_usercrud_usercrud__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__otherprofile_otherprofile__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase_app__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase_app__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SearchPage = (function () {
    function SearchPage(navCtrl, navParams, modalCtrl, afAuth, afDatabase, userCrud, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.afAuth = afAuth;
        this.afDatabase = afDatabase;
        this.userCrud = userCrud;
        this.storage = storage;
        this.invitations = [];
        this.currentUser = {};
        this.afAuth.auth.onAuthStateChanged(function (user) {
            if (user) {
                _this.currentUser.id = user.uid;
                console.log(_this.currentUser.id);
            }
            else {
                console.log("Erreur de chargement");
            }
        });
        this.initilizeUsers();
    }
    SearchPage.prototype.initilizeUsers = function () {
        var _this = this;
        var sUsers = this.afDatabase.list("/users/").valueChanges().subscribe(function (data) {
            _this.users = [];
            data.forEach(function (element) {
                var user = element;
                user.state = 0;
                _this.verifInvitation(user);
                console.log(user);
                _this.users.push(user);
            });
            console.log(_this.users);
            sUsers.unsubscribe();
        });
    };
    SearchPage.prototype.getUsers = function (ev) {
        // Reset items back to all of the items
        this.list = this.users;
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.list = this.list.filter(function (item) {
                return (item.displayName.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    /*   ionViewDidLoad() {
        console.log('ionViewDidLoad SearchPage');
        let sInvitations = this.afDatabase.list('/invitations/').valueChanges().subscribe(data => {
          this.invitations = data;
          console.log(this.invitations);
          sInvitations.unsubscribe();
        });
      } */
    SearchPage.prototype.sendMessage = function (id) {
        console.log("send message to : " + id);
    };
    SearchPage.prototype.sendInvitation = function (user) {
        console.log("idReceiver : ", user.id);
        var invitation = {};
        invitation.idReceiver = user.id;
        invitation.idSender = this.currentUser.id;
        console.log(invitation);
        user.state = 2;
        var newRef = this.afDatabase.list('/invitations/').push({});
        newRef.set({
            key: newRef.key,
            idSender: invitation.idSender,
            idReceiver: invitation.idReceiver,
            date: __WEBPACK_IMPORTED_MODULE_7_firebase_app__["database"].ServerValue.TIMESTAMP
        });
    };
    SearchPage.prototype.cancelInvitation = function (user) {
        var _this = this;
        user.state = 2;
        this.afDatabase.database.ref("/invitations/").orderByChild("idSender").equalTo(this.currentUser.id).once("value", function (snap) {
            console.log(snap);
            snap.forEach(function (element) {
                if (element.val().idReceiver == user.id) {
                    console.log(element);
                    var key = element.val().key;
                    _this.afDatabase.list('/invitations/').remove(key);
                    console.log(user);
                    return false;
                }
            });
        });
    };
    SearchPage.prototype.verifInvitation = function (user) {
        var _this = this;
        console.log(user.id);
        var sVerifInvit = this.afDatabase.list("/invitations/").valueChanges().subscribe(function (data) {
            data.forEach(function (element) {
                if (element.idSender == _this.currentUser.id && element.idReceiver == user.id) {
                    console.log(element);
                    console.log("invit sent");
                    user.state = 2;
                    console.log(user);
                }
                else if (element.idSender == user.id && element.idReceiver == _this.currentUser.id) {
                    console.log(element);
                    console.log("invit recu");
                    user.state = 3;
                    console.log(user);
                }
            });
            sVerifInvit.unsubscribe();
        });
        if (user.state != 2 && user.state != 3) {
            var sVerifFriends_1 = this.afDatabase.list("/friends/").valueChanges().subscribe(function (data) {
                data.forEach(function (element) {
                    if ((element.id1 == _this.currentUser.id && element.id2 == user.id) || (element.id2 == _this.currentUser.id && element.id1 == user.id)) {
                        console.log("friends");
                        user.state = 1;
                        console.log(user);
                    }
                });
                sVerifFriends_1.unsubscribe();
            });
        }
    };
    SearchPage.prototype.goToUserProfile = function (user) {
        var otherProfileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__otherprofile_otherprofile__["a" /* OtherprofilePage */], {
            "currentUserId": this.currentUser.id,
            "userId": user.id,
            "relationStatus": user.state
        });
        otherProfileModal.present();
    };
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search',template:/*ion-inline-start:"/home/anwar/pfeHanimo/src/pages/search/search.html"*/'<ion-header>\n\n  <ion-toolbar>\n      <ion-searchbar (ionInput)="getUsers($event)"></ion-searchbar>\n    </ion-toolbar> \n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n    <ion-item *ngFor="let user of list">\n      <ion-avatar item-start (click)="goToUserProfile(user)">\n        <img src="{{user.imageUrl}}">\n      </ion-avatar>\n      <h2>{{user.displayName}}</h2>\n      <button ion-button (click)="sendMessage(user.id)" >Message</button>\n\n      <button *ngIf="user.state == 0" ion-button (click)="sendInvitation(user)" item-end >\n        ajouter\n      </button>\n\n      <button *ngIf="user.state == 2" ion-button (click)="cancelInvitation(user)" item-end >\n        annuler invit\n      </button>\n\n      <button *ngIf="user.state == 3" ion-button (click)="verifInvitation(user)" item-end >\n        accepter invit\n      </button>\n\n      <button *ngIf="user.state == 1" ion-button (click)="verifInvitation(user)" item-end >\n        deja amis\n      </button>\n\n    </ion-item>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/home/anwar/pfeHanimo/src/pages/search/search.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_5_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_3__providers_usercrud_usercrud__["a" /* UsercrudProvider */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
    ], SearchPage);
    return SearchPage;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 345:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConseilModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_pubs_pubs__ = __webpack_require__(167);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ConseilModalPage = (function () {
    function ConseilModalPage(navCtrl, navParams, viewCtrl, pubsProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.pubsProvider = pubsProvider;
        this.conseil = {};
        this.currentUserId = this.navParams.get("currentUserId");
        this.conseil.conseilCreatorId = this.currentUserId;
        console.log("this.conseil.conseilCreatorId");
        console.log(this.conseil.conseilCreatorId);
    }
    ConseilModalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ConseilModalPage');
    };
    ConseilModalPage.prototype.addConseil = function (conseilContent) {
        this.conseil.content = conseilContent;
        console.log("this.conseil");
        console.log(this.conseil);
        this.pubsProvider.addConseil(this.conseil);
        this.viewCtrl.dismiss();
    };
    ConseilModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-conseil-modal',template:/*ion-inline-start:"/home/anwar/pfeHanimo/src/pages/conseil-modal/conseil-modal.html"*/'\n<ion-header>\n\n  <ion-navbar>\n    <ion-title left>conseilModal</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n    <ion-item>\n\n      <ion-input [(ngModel)]="conseil.content" type="text" rows="4" cols="50" placeholder="Votre conseil ...">\n      </ion-input>\n      \n    </ion-item>\n\n    <ion-item>\n\n      <button ion-button (click)="addConseil(conseil.content)" block>\n          Publiez Votre conseil\n      </button>\n\n    </ion-item>\n\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/anwar/pfeHanimo/src/pages/conseil-modal/conseil-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_pubs_pubs__["a" /* PubsProvider */]])
    ], ConseilModalPage);
    return ConseilModalPage;
}());

//# sourceMappingURL=conseil-modal.js.map

/***/ }),

/***/ 346:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PublicationModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_pubs_pubs__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_media_capture__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_media__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var PublicationModalPage = (function () {
    function PublicationModalPage(navCtrl, navParams, camera, actionSheetCtrl, pubsProvider, viewController, afDatabase, mediaCapture, storage, file, media) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.camera = camera;
        this.actionSheetCtrl = actionSheetCtrl;
        this.pubsProvider = pubsProvider;
        this.viewController = viewController;
        this.afDatabase = afDatabase;
        this.mediaCapture = mediaCapture;
        this.storage = storage;
        this.file = file;
        this.media = media;
        this.currentUser = {};
        this.imageNumber = 0;
        this.captureDataUrl = [];
    }
    PublicationModalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PublicationModalPage');
    };
    PublicationModalPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var id = this.navParams.get("currentUserId");
        this.afDatabase.database.ref("/users/" + id).once("value", function (data) {
            _this.currentUser = data.val();
            console.log(_this.currentUser);
        });
    };
    PublicationModalPage.prototype.publier = function () {
        var publication = {};
        publication.creatorId = this.currentUser.id;
        publication.nbimage = this.imageNumber;
        publication.content = this.content;
        publication.date = __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.database.ServerValue.TIMESTAMP;
        this.pubsProvider.addPublication(publication, this.captureDataUrl);
    };
    PublicationModalPage.prototype.openAction = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Enrichissez votre publication',
            buttons: [
                {
                    text: 'Prendre une photo',
                    handler: function () {
                        console.log('Prendre une photo clicked');
                        _this.takePicture();
                    }
                },
                {
                    text: 'Video',
                    handler: function () {
                        console.log('Video clicked');
                        /* this.recordVideo(); */
                    }
                },
                {
                    text: 'Gallerie',
                    handler: function () {
                        console.log('Gallerie clicked');
                    }
                },
                {
                    text: 'Position',
                    handler: function () {
                        console.log('Position clicked');
                    }
                }
            ]
        });
        actionSheet.present();
    };
    PublicationModalPage.prototype.takePicture = function () {
        this.capture(1);
    };
    PublicationModalPage.prototype.importPicture = function () {
        this.capture(1);
    };
    PublicationModalPage.prototype.recordVideo = function () {
        var _this = this;
        var options = {
            limit: 1,
            duration: 60
        };
        this.mediaCapture.captureVideo(options).then(function (data) {
            console.log(data);
            var fpath = data[0].fullPath;
            var name = data[0].name;
            var path = fpath.replace(name, '');
            _this.video = path;
        }).then(function () {
            var storageRef = __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.storage().ref("videos/");
            storageRef.putString(_this.video, __WEBPACK_IMPORTED_MODULE_9_firebase___default.a.storage.StringFormat.DATA_URL).then(function (snap) {
                console.log("video added : " + snap);
                console.log(snap);
            });
        });
    };
    PublicationModalPage.prototype.capture = function (sourceType) {
        var _this = this;
        console.log("cameraaaaaaaa capture");
        var cameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: sourceType,
            allowEdit: true,
            correctOrientation: true
        };
        this.camera.getPicture(cameraOptions).then(function (imageData) {
            console.log(imageData);
            var dataUrl = 'data:image/jpeg;base64,' + imageData;
            _this.captureDataUrl.push(dataUrl);
            _this.imageNumber++;
            console.log(_this.captureDataUrl);
        }, function (err) {
            console.log(err);
        });
    };
    PublicationModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-publication-modal',template:/*ion-inline-start:"/home/anwar/pfeHanimo/src/pages/publication-modal/publication-modal.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>publicationModal</ion-title>    \n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-item>\n    <ion-input [(ngModel)]="content" placeholder="Exprimer Vous" clearInput></ion-input>\n  </ion-item>\n\n  <ion-row *ngIf="captureDataUrl">\n    <ion-slides zoom="true" pager>\n      <ion-slide *ngFor="let img of captureDataUrl">\n        <img src="{{img}}">\n      </ion-slide>\n    </ion-slides>\n  </ion-row>\n\n  <button ion-button block (click)="publier()">publier</button>\n</ion-content>\n\n<ion-footer>\n    <ion-toolbar>\n      <ion-title (click)="openAction()" >Enrichisser votre publication</ion-title>\n    </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/home/anwar/pfeHanimo/src/pages/publication-modal/publication-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_4__providers_pubs_pubs__["a" /* PubsProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_media_capture__["a" /* MediaCapture */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_file__["a" /* File */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_native_media__["a" /* Media */]])
    ], PublicationModalPage);
    return PublicationModalPage;
}());

//# sourceMappingURL=publication-modal.js.map

/***/ }),

/***/ 347:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PosterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__annonce_a0_annonce_a0__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__annonce_a3_annonce_a3__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__annonce_a2_annonce_a2__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__annonce_a1_annonce_a1__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_diagnostic__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









var PosterPage = (function () {
    function PosterPage(navCtrl, alertCtrl, afAuth, afDatabase, diagnostic) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.afAuth = afAuth;
        this.afDatabase = afDatabase;
        this.diagnostic = diagnostic;
        this.user = {};
        this.reputation = 0;
        this.afAuth.auth.onAuthStateChanged(function (user) {
            if (user) {
                _this.user.id = user.uid;
                console.log(_this.user.id);
                _this.getUserReputation(_this.user.id).then(function () {
                    console.log("this.reputation : ");
                    console.log(_this.reputation);
                });
            }
            else {
                console.log("Erreur de chargement");
            }
        });
    }
    PosterPage.prototype.goToA0 = function () {
        var _this = this;
        this.diagnostic.isLocationEnabled().then(function (res) {
            if (res == true) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__annonce_a0_annonce_a0__["a" /* AnnonceA0Page */]);
            }
            else {
                alert("Veuillez activez votre gps");
            }
        });
    };
    PosterPage.prototype.goToA1 = function () {
        var _this = this;
        this.diagnostic.isLocationEnabled().then(function (res) {
            if (res == true) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__annonce_a1_annonce_a1__["a" /* AnnonceA1Page */]);
            }
            else {
                alert("Veuillez activez votre gps");
            }
        });
    };
    PosterPage.prototype.goToA2 = function () {
        var _this = this;
        this.diagnostic.isLocationEnabled().then(function (res) {
            if (res == true) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__annonce_a2_annonce_a2__["a" /* AnnonceA2Page */]);
            }
            else {
                alert("Veuillez activez votre gps");
            }
        });
    };
    PosterPage.prototype.goToA3 = function () {
        var _this = this;
        this.diagnostic.isLocationEnabled().then(function (res) {
            if (res == true) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__annonce_a3_annonce_a3__["a" /* AnnonceA3Page */]);
            }
            else {
                alert("Veuillez activez votre gps");
            }
        });
    };
    PosterPage.prototype.getUserReputation = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.afDatabase.database.ref("/users/" + userId + "/reputation").once("value", function (snap) {
                            _this.reputation = snap.val();
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    PosterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-poster',template:/*ion-inline-start:"/home/anwar/pfeHanimo/src/pages/poster/poster.html"*/'<ion-header>\n    <ion-navbar>\n          <button ion-button icon-only menuToggle  >\n            <ion-icon name="menu"></ion-icon>\n          </button>\n          <ion-title> Poster une annonce</ion-title>\n    </ion-navbar> \n  </ion-header>\n\n<ion-content>\n\n    <ion-card class="aide" (click)="goToA3()" color="#C3CCB2" >\n        <ion-grid>\n            <ion-row>\n              <ion-col >\n                <ion-label >Besoin d\'aide</ion-label>\n                </ion-col>\n            </ion-row>\n          </ion-grid>\n    </ion-card>\n\n\n    <ion-card class="foyer" (click)="goToA2()" color="#4D898F">\n        <ion-grid>\n            <ion-row>\n              <ion-col >\n                <ion-label >Cherchant un foyer</ion-label>\n                </ion-col>\n            </ion-row>\n          </ion-grid>\n    </ion-card>\n\n\n    <ion-card *ngIf="reputation > 29" class="blessure" (click)="goToA1()" color="#BF983E">\n        <ion-grid>\n            <ion-row>\n              <ion-col >\n                <ion-label >Blessure ou Maladie</ion-label>\n                </ion-col>\n            </ion-row>\n          </ion-grid>\n    </ion-card>\n\n\n    <ion-card *ngIf="reputation > 29" class="danger" (click)="goToA0()" color="#9B5337">\n        <ion-grid>\n            <ion-row>\n              <ion-col >\n                <ion-label >En Danger</ion-label>\n                </ion-col>\n            </ion-row>\n          </ion-grid> \n    </ion-card>\n\n\n    <ion-card class="autre" (click)="goToAutre()" color="#333537">\n        <ion-grid>\n            <ion-row>\n              <ion-col >\n                <ion-label >Autre</ion-label>\n                </ion-col>\n            </ion-row>\n          </ion-grid>\n    </ion-card>\n\n  <!--<button ion-button (click)="getImage()">getImage</button>-->\n\n\n</ion-content>'/*ion-inline-end:"/home/anwar/pfeHanimo/src/pages/poster/poster.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_6_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_7_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_8__ionic_native_diagnostic__["a" /* Diagnostic */]])
    ], PosterPage);
    return PosterPage;
}());

//# sourceMappingURL=poster.js.map

/***/ }),

/***/ 348:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnnoncesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__map_map__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__comments_modal_comments_modal__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_annonce_crud_annonce_crud__ = __webpack_require__(55);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









var AnnoncesPage = (function () {
    function AnnoncesPage(navCtrl, navParams, actionSheetCtrl, modalCtrl, toastCtrl, annonceCrudProvider, afAuth, afDatabase, geolocation) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionSheetCtrl = actionSheetCtrl;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.annonceCrudProvider = annonceCrudProvider;
        this.afAuth = afAuth;
        this.afDatabase = afDatabase;
        this.geolocation = geolocation;
        this.liked = false;
        this.isModal = false;
        this.currentUser = {};
        this.annonceList = [];
        this.publications = [];
        this.storageRef = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.storage().ref();
        this.compteur = 0;
        this.nowDate = new Date();
        console.log(this.nowDate);
        this.afAuth.auth.onAuthStateChanged(function (user) {
            if (user) {
                _this.currentUser.id = user.uid;
                console.log("modifying user position");
                console.log(_this.currentUser.id);
            }
            else {
                console.log("Erreur de chargement");
            }
        });
        this.loadPage();
    }
    AnnoncesPage.prototype.loadPage = function () {
        var _this = this;
        console.log('Load AnnoncesPage');
        this.gettingPosition().then(function () {
            console.log("pooosssiittiiooonn .......");
            var sAnnonces = _this.afDatabase.list("/annonces/").valueChanges().subscribe(function (data) {
                console.log(data);
                console.log("data");
                data.forEach(function (element) {
                    console.log(element.likes);
                    var pub = element;
                    pub.liked = false;
                    pub.myComment = "";
                    _this.isLiked(pub);
                    console.log("pub");
                    console.log(pub);
                    var to = {
                        latitude: pub.latitude,
                        longitude: pub.longitude
                    };
                    /* let distance = this.getDistanceBetweenPoints(this.pos,to,'km');
                    console.log("distance");
                    console.log(distance);
                    if(distance<300){ */
                    if (pub.date) {
                        var d = new Date(pub.date);
                        console.log(d.toDateString());
                        pub.time = d.getDay().toString() + "," + d.getMonth().toString() + "," + d.getHours() + ":" + d.getMinutes();
                    }
                    if (pub.nbimage > 0) {
                        pub.imagesUrl = []; /**/
                        for (var i = 0; i < pub.nbimage; i++) {
                            _this.storageRef.child("annoncesimages/" + pub.idAnnonce + "/" + i + ".jpg").getDownloadURL().then(function (res) {
                                pub.imagesUrl.push(res);
                            });
                        }
                        console.log(pub.imagesUrl);
                    }
                    _this.afDatabase.database.ref("/users/" + pub.creatorAnnonceId).once("value", function (snap) {
                        pub.displayName = snap.val().displayName;
                        pub.avaterUrl = snap.val().imageUrl;
                        console.log(pub);
                        pub.index = _this.compteur;
                        _this.compteur++;
                        _this.publications.push(pub);
                    });
                    console.log(pub);
                    /* } */
                });
                console.log(_this.publications);
                sAnnonces.unsubscribe();
            });
        });
    };
    AnnoncesPage.prototype.openMapModal = function (pub) {
        var mapModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_6__map_map__["a" /* MapPage */], {
            "annonceLat": pub.latitude,
            "annonceLng": pub.longitude,
            "annonceTitle": pub.titleAnnonce,
            "annonceDesc": pub.descAnnonce,
            "currentPosLat": 35.7624676,
            "currentPosLng": 10.8400702
        }, { cssClass: 'inset-modal' })
            .present();
    };
    AnnoncesPage.prototype.showComments = function (idAnnonce) {
    };
    AnnoncesPage.prototype.likePub = function (pub) {
        pub.liked = true;
        this.annonceCrudProvider.likePub(pub.idAnnonce, this.currentUser.id);
        //add like to user activity log
        var newRef = this.afDatabase.list("/users/" + this.currentUser.id + "/activitylog").push({});
        newRef.set({
            key: newRef.key,
            type: 1,
            userId: this.currentUser.id,
            idAnnonce: pub.idAnnonce,
            date: __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database.ServerValue.TIMESTAMP
        });
    };
    AnnoncesPage.prototype.dislikePub = function (pub) {
        var _this = this;
        console.log(pub);
        pub.liked = false;
        this.annonceCrudProvider.dislikePub(pub.idAnnonce, this.currentUser.id);
        this.afDatabase.database.ref("/users/" + this.currentUser.id + "/activitylog")
            .orderByChild("idAnnonce").equalTo(pub.idAnnonce).once("value", function (snap) {
            snap.forEach(function (data) {
                if (data.val().type == 1) {
                    _this.afDatabase.list("/users/" + _this.currentUser.id + "/activitylog/" + data.val().key).remove();
                }
                return false;
            });
        });
    };
    AnnoncesPage.prototype.commentAnnonce = function (pub) {
        console.log("adding comment");
        console.log(pub.myComment);
        this.annonceCrudProvider.commentAnnonce(pub.idAnnonce, pub.myComment, this.currentUser.id)
            .then(function () {
            pub.myComment = "";
            console.log(pub.myComment);
        });
        var newRef = this.afDatabase.list("/users/" + this.currentUser.id + "/activitylog").push({});
        newRef.set({
            key: newRef.key,
            type: 2,
            userId: this.currentUser.id,
            idAnnonce: pub.idAnnonce,
            date: __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database.ServerValue.TIMESTAMP
        });
    };
    AnnoncesPage.prototype.shareAnnonce = function (pub) {
        var share = {
            key: "",
            userId: this.currentUser.id,
            idAnnonce: pub.idAnnonce,
            type: "annonce",
            date: __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database.ServerValue.TIMESTAMP
        };
        var newRef = this.afDatabase.list("/sharing/").push({});
        share.key = newRef.key;
        console.log(share);
        newRef.set(share);
        var toast = this.toastCtrl.create({
            message: 'Annonce partagé sur votre profil',
            duration: 1500,
            position: "middle"
        });
        toast.present();
    };
    AnnoncesPage.prototype.isLiked = function (pub) {
        var sLikes = this.afDatabase.list("/annonces/" + pub.idAnnonce + "/likes/" + this.currentUser.id).valueChanges().subscribe(function (data) {
            console.log(data.length);
            if (data.length == 1) {
                pub.liked = true;
                console.log(pub.liked);
            }
            else {
                pub.liked = false;
                console.log(pub.liked);
            }
            sLikes.unsubscribe();
        });
    };
    AnnoncesPage.prototype.openCommentsModal = function (pub) {
        var commentsModalPage = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__comments_modal_comments_modal__["a" /* CommentsModalPage */], {
            "order": "annonce",
            "idAnnonce": pub.idAnnonce,
            "titleAnnonce": pub.titleAnnonce
        }).present();
    };
    AnnoncesPage.prototype.getDistanceBetweenPoints = function (start, end, units) {
        var earthRadius = {
            miles: 3958.8,
            km: 6371
        };
        var R = earthRadius[units || 'miles'];
        var lat1 = start.latitude;
        var lon1 = start.longitude;
        var lat2 = end.latitude;
        var lon2 = end.longitude;
        var dLat = this.toRad((lat2 - lat1));
        var dLon = this.toRad((lon2 - lon1));
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    };
    AnnoncesPage.prototype.toRad = function (x) {
        return x * Math.PI / 180;
    };
    AnnoncesPage.prototype.gettingPosition = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    AnnoncesPage.prototype.getImage = function (idAnnonce, i) {
        var storageRef = __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.storage().ref();
        storageRef.child("annoncesimages/" + idAnnonce + "/" + i + ".jpg").getDownloadURL().then(function (res) {
            console.log(res);
        });
    };
    AnnoncesPage.prototype.showMore = function (pub) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                    text: 'Partager',
                    handler: function () {
                        _this.shareAnnonce(pub);
                    }
                },
                {
                    text: 'Reporter',
                    handler: function () {
                        _this.reportAnnonce(pub);
                    }
                }
            ]
        });
        actionSheet.present();
    };
    AnnoncesPage.prototype.reportAnnonce = function (annonce) {
        this.annonceCrudProvider.reportAnnonce(annonce.idAnnonce, this.currentUser.id);
        var index = this.publications.findIndex(function (item) { return item.idAnnonce == annonce.idAnnonce; });
        this.publications.splice(index, 1);
        console.log(index);
    };
    AnnoncesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-annonces',template:/*ion-inline-start:"/home/anwar/pfeHanimo/src/pages/annonces/annonces.html"*/'\n<ion-header>\n\n  <ion-navbar>\n      <button ion-button icon-only menuToggle  >\n          <ion-icon name="menu"></ion-icon>\n        </button>\n    <ion-title>annonces</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n<ion-list *ngIf="publications">\n\n  <ion-card *ngFor="let pub of publications" >\n\n    <ion-item>\n      <ion-avatar item-start>\n        <img src="{{pub.avaterUrl}}">\n      </ion-avatar>\n      <h2>{{pub.displayName}}</h2>\n      <p>{{pub.time}}</p>\n\n      <ion-icon (click)="showMore(pub)" item-end name="ios-more"></ion-icon>\n    </ion-item>\n  \n    <ion-fab class="myFab" right>\n      <button (click)="openMapModal(pub)" ion-fab>\n        <ion-icon name="pin"></ion-icon>\n      </button>\n    </ion-fab>\n\n    <!--> galerie slider -->\n    <ion-row>\n      <ion-slides zoom="true" pager>\n        <ion-slide *ngFor="let img of pub.imagesUrl">\n          <img src="{{img}}">\n        </ion-slide>\n      </ion-slides>\n    </ion-row>\n    \n  \n    <ion-card-content>\n      <p>{{pub.descAnnonce}}</p>\n    </ion-card-content>\n\n    <ion-row>\n      <!-- *ngIf="!isLiked(pub)"  -->\n      <ion-col *ngIf="!pub.liked" >\n        <button (click)="likePub(pub)" ion-button icon-left clear small>\n          <ion-icon name="ios-heart-outline"></ion-icon>\n          <div>J\'aime</div>\n        </button>\n      </ion-col>\n\n    <!--   *ngIf="isLiked(pub)"  -->\n      <ion-col *ngIf="pub.liked" >\n        <button (click)="dislikePub(pub)" ion-button icon-left clear small>\n          <ion-icon name="ios-heart"></ion-icon>\n          <div>J\'aime pas</div>\n        </button>\n      </ion-col>\n\n      <ion-col>\n        <button (click)="openCommentsModal(pub)" ion-button icon-left clear small>\n          <ion-icon name="text"></ion-icon>\n          <div>Commentaires</div>\n        </button>\n      </ion-col>\n\n      <!-- <ion-col>\n        <button (click)="shareAnnonce(pub)" ion-button icon-left clear small>\n          <ion-icon name="share"></ion-icon>\n          <div>Partage</div>\n        </button>\n      </ion-col> -->\n\n    </ion-row>\n\n    <ion-item>\n      <ion-input placeholder="ajouter un commentaire" [(ngModel)]="pub.myComment" item-start> </ion-input>\n      <button ion-button (click)="commentAnnonce(pub)" item-end>COM</button>\n    </ion-item>\n\n  </ion-card>\n\n</ion-list>\n\n</ion-content>\n  '/*ion-inline-end:"/home/anwar/pfeHanimo/src/pages/annonces/annonces.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_8__providers_annonce_crud_annonce_crud__["a" /* AnnonceCrudProvider */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_geolocation__["a" /* Geolocation */]])
    ], AnnoncesPage);
    return AnnoncesPage;
}());

//# sourceMappingURL=annonces.js.map

/***/ }),

/***/ 349:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


;
var MapPage = (function () {
    function MapPage(navCtrl, navParams, viewCtrl, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.platform = platform;
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.annonceLat = navParams.get("annonceLat");
        console.log(this.annonceLat);
        this.annonceLng = navParams.get("annonceLng");
        console.log(this.annonceLng);
        this.annonceTitle = navParams.get("annonceTitle");
        console.log(this.annonceTitle);
        this.annonceDesc = navParams.get("annonceDesc");
        console.log(this.annonceDesc);
        this.currentPosLat = navParams.get("currentPosLat");
        console.log(this.currentPosLat);
        this.currentPosLng = navParams.get("currentPosLng");
        console.log(this.currentPosLng);
        platform.ready().then(function () {
            _this.loadMap();
        });
    }
    MapPage.prototype.loadMap = function () {
        // start my map
        var annoncePos = new google.maps.LatLng(this.annonceLat, this.annonceLng);
        var currentPos = new google.maps.LatLng(this.currentPosLat, this.currentPosLng);
        this.map = new google.maps.Map(this.mapElement.nativeElement, {
            zoom: 17,
            center: annoncePos,
            mapTypeId: 'roadmap'
        });
        //associating direction display to the map
        this.directionsDisplay.setMap(this.map);
        this.directionsDisplay.setOptions({
            suppressMarkers: true,
            optimizeWaypoints: false
        });
        var annonceMarker = this.addMarker(this.annonceLat, this.annonceLng, this.annonceTitle);
        console.log(annonceMarker);
        var currentPosMarker = this.addMarker(this.currentPosLat, this.currentPosLng, "vous etes ici");
        console.log(currentPosMarker);
        this.calculateAndDisplayRoute(currentPos, annoncePos);
    };
    MapPage.prototype.addMarker = function (lat, lng, title) {
        console.log("adding Marker : " + title, lat, lng);
        var pos = new google.maps.LatLng(lat, lng);
        var infowindow = new google.maps.InfoWindow({
            content: title
        });
        var marker = new google.maps.Marker({
            position: pos,
            map: this.map,
            animation: google.maps.Animation.DROP,
        });
        infowindow.open(this.map, marker);
        return marker;
    };
    MapPage.prototype.calculateAndDisplayRoute = function (start, end) {
        var _this = this;
        console.log(start, end);
        this.directionsService.route({
            origin: start,
            destination: end,
            travelMode: 'WALKING'
        }, function (response, status) {
            if (status === 'OK') {
                _this.directionsDisplay.setDirections(response);
            }
            else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    };
    MapPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], MapPage.prototype, "mapElement", void 0);
    MapPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-map',template:/*ion-inline-start:"/home/anwar/pfeHanimo/src/pages/map/map.html"*/'<ion-header>\n  <ion-navbar>\n      <button ion-button full color="danger" (click)="dismiss()">Okay\n        </button>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <div #map id="map"></div>\n</ion-content>'/*ion-inline-end:"/home/anwar/pfeHanimo/src/pages/map/map.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */]])
    ], MapPage);
    return MapPage;
}());

//# sourceMappingURL=map.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FriendsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__messaging_modal_messaging_modal__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__otherprofile_otherprofile__ = __webpack_require__(166);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var FriendsPage = (function () {
    function FriendsPage(navCtrl, navParams, modalCtrl, afDatabase, afAuth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.afDatabase = afDatabase;
        this.afAuth = afAuth;
        this.currentUser = {};
        this.friends = [];
        this.tab = [];
    }
    FriendsPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.afAuth.auth.onAuthStateChanged(function (user) {
            if (user) {
                _this.currentUser.id = user.uid;
                console.log(_this.currentUser.id);
            }
            else {
                console.log("Erreur de chargement");
            }
        });
        this.intializeFriendList();
    };
    FriendsPage.prototype.intializeFriendList = function () {
        var _this = this;
        var sAnnonces = this.afDatabase.list("/friends/").valueChanges().subscribe(function (data) {
            console.log(data);
            var i = 0;
            data.forEach(function (element) {
                if (element.id1 == _this.currentUser.id || element.id2 == _this.currentUser.id) {
                    var friend_1 = {};
                    friend_1.userId = element.id2;
                    if (element.id2 == _this.currentUser.id) {
                        friend_1.userId = element.id1;
                    }
                    friend_1.key = element.key;
                    friend_1.date = element.date;
                    console.log(friend_1);
                    _this.afDatabase.database.ref("/users/" + friend_1.userId).once("value", function (snap) {
                        friend_1.displayName = snap.val().displayName;
                        friend_1.avaterUrl = snap.val().imageUrl;
                        friend_1.index = i;
                        console.log(friend_1);
                        i++;
                        _this.friends.push(friend_1);
                    });
                }
            });
            _this.tab = _this.friends;
            console.log("-------------------------");
            _this.friends.sort(function (a, b) {
                return a.date - b.date;
            });
            console.log(_this.tab);
            console.log("-------------------------");
            sAnnonces.unsubscribe();
        });
    };
    FriendsPage.prototype.deleteFriend = function (key, index) {
        console.log(index);
        this.tab.splice(index, 1);
        this.friends.splice(index, 1);
        console.log(this.friends);
        console.log(this.tab);
        this.afDatabase.list('/friends/').remove(key);
        console.log("deleting : ", key);
    };
    FriendsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FriendsPage');
    };
    FriendsPage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        this.tab = this.friends;
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.tab = this.tab.filter(function (item) {
                return (item.displayName.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    FriendsPage.prototype.message = function (friendId) {
        var messageModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__messaging_modal_messaging_modal__["a" /* MessagingModalPage */], {
            "currentUser": this.currentUser.id,
            "friendId": friendId
        });
        messageModal.present();
    };
    FriendsPage.prototype.goToUserProfile = function (userId) {
        var otherProfileModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__otherprofile_otherprofile__["a" /* OtherprofilePage */], {
            "currentUserId": this.currentUser.id,
            "userId": userId,
            "relationStatus": 1
        });
        otherProfileModal.present();
    };
    FriendsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-friends',template:/*ion-inline-start:"/home/anwar/pfeHanimo/src/pages/friends/friends.html"*/'<ion-header>\n  <ion-navbar>\n      <button ion-button icon-only menuToggle  >\n          <ion-icon name="menu"></ion-icon>\n      </button>\n    <ion-title>\n      liste d\'amis\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n    <ion-searchbar placeholder="trouver un ami" (ionInput)="getItems($event)"></ion-searchbar>\n  <ion-list *ngIf="friends" >\n\n      <ion-item *ngFor="let friend of tab" >\n\n        <ion-avatar item-start (click)="goToUserProfile(friend.userId)" >\n          <img src="{{friend.avaterUrl}}">\n        </ion-avatar>\n\n        <h2>{{friend.displayName}}</h2>\n        <button ion-button (click)="message(friend.userId)" item-end>message</button>\n        <button ion-button (click)="deleteFriend(friend.key,friend.index)" item-end>Supprimer</button>\n      </ion-item>\n\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/anwar/pfeHanimo/src/pages/friends/friends.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], FriendsPage);
    return FriendsPage;
}());

//# sourceMappingURL=friends.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__settings_profile_settings_profile__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__comments_modal_comments_modal__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_usercrud_usercrud__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_annonce_crud_annonce_crud__ = __webpack_require__(55);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var ProfilePage = (function () {
    function ProfilePage(navCtrl, navParams, actionSheetCtrl, modalController, afDatabase, afAuth, usercrudProvider, annonceCrudProvider, camera) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.actionSheetCtrl = actionSheetCtrl;
        this.modalController = modalController;
        this.afDatabase = afDatabase;
        this.afAuth = afAuth;
        this.usercrudProvider = usercrudProvider;
        this.annonceCrudProvider = annonceCrudProvider;
        this.camera = camera;
        this.currentUser = {};
        this.publications = [];
        this.storageRef = __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.storage().ref();
    }
    ProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ProfilePage');
    };
    ProfilePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.afAuth.auth.onAuthStateChanged(function (user) {
            if (user) {
                _this.afDatabase.database.ref("/users/" + user.uid).on("value", function (data) {
                    _this.currentUser = data.val();
                    console.log(_this.currentUser);
                    _this.loadActivities();
                });
            }
            else {
                console.log("Erreur de chargement");
            }
        });
    };
    ProfilePage.prototype.changePicture = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Modify your album',
            buttons: [
                {
                    text: 'Camera',
                    handler: function () {
                        console.log('Camera clicked');
                        _this.capture(1);
                    }
                },
                {
                    text: 'Galerie',
                    handler: function () {
                        console.log('Galerie clicked');
                        _this.capture(0);
                    }
                }
            ]
        });
        actionSheet.present();
    };
    ProfilePage.prototype.settings = function () {
        var user = JSON.stringify(this.currentUser);
        var profileModal = this.modalController.create(__WEBPACK_IMPORTED_MODULE_4__settings_profile_settings_profile__["a" /* SettingsProfilePage */], { "currentUser": user });
        profileModal.present();
    };
    ProfilePage.prototype.capture = function (sourceType) {
        var _this = this;
        console.log("cameraaaaaaaa capture");
        var cameraOptions = {
            quality: 50,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: sourceType
        };
        this.camera.getPicture(cameraOptions).then(function (imageData) {
            console.log(imageData);
            var dataUrl = 'data:image/jpeg;base64,' + imageData;
            _this.imageUrl = dataUrl;
            console.log(_this.imageUrl);
            _this.currentUser.imageUrl = _this.imageUrl;
            _this.usercrudProvider.uploadProfilePicture(dataUrl, _this.currentUser.id);
        }, function (err) {
            console.log(err);
        });
    };
    ProfilePage.prototype.loadActivities = function () {
        var _this = this;
        //getting publication
        this.afDatabase.database.ref("/publications/").orderByChild("creatorId")
            .equalTo(this.currentUser.id).once("value", function (snapshots) {
            snapshots.forEach(function (element) {
                var pub = {};
                pub = element.val();
                pub.order = "publication";
                pub.liked = false;
                pub.myComment = "";
                _this.isLiked(pub);
                console.log(pub);
                var d = new Date(pub.date);
                pub.time = d.getDay().toString() + "," + d.getMonth().toString() + "," + d.getHours() + ":" + d.getMinutes();
                if (pub.nbimage > 0) {
                    pub.imagesUrl = []; /**/
                    for (var i = 0; i < pub.nbimage; i++) {
                        _this.storageRef.child("publicationsimages/" + pub.key + "/" + i + ".jpg").getDownloadURL().then(function (res) {
                            pub.imagesUrl.push(res);
                        });
                    }
                    console.log(pub.imagesUrl);
                }
                // pub.displayName = this.currentUser.displayName;
                // pub.avaterUrl = snap.val().imageUrl;
                // console.log(pub);
                _this.publications.push(pub);
                console.log(pub);
                console.log(_this.publications);
                return false;
            });
        });
        //getting annonces
        this.afDatabase.database.ref("/annonces/").orderByChild("creatorAnnonceId")
            .equalTo(this.currentUser.id).once("value", function (snapshots) {
            snapshots.forEach(function (element) {
                var pub = {};
                pub = element.val();
                pub.order = "annonce";
                pub.liked = false;
                pub.myComment = "";
                _this.isLiked(pub);
                console.log(pub);
                var d = new Date(pub.date);
                pub.time = d.getDay().toString() + "," + d.getMonth().toString() + "," + d.getHours() + ":" + d.getMinutes();
                if (pub.nbimage > 0) {
                    pub.imagesUrl = []; /**/
                    for (var i = 0; i < pub.nbimage; i++) {
                        _this.storageRef.child("annoncesimages/" + pub.idAnnonce + "/" + i + ".jpg").getDownloadURL().then(function (res) {
                            pub.imagesUrl.push(res);
                        });
                    }
                    console.log(pub.imagesUrl);
                }
                // pub.displayName = this.currentUser.displayName;
                // pub.avaterUrl = snap.val().imageUrl;
                // console.log(pub);
                _this.publications.push(pub);
                console.log(pub);
                console.log(_this.publications);
                return false;
            });
        });
        //getting sharings
        this.afDatabase.database.ref("/sharing/").orderByChild("userId")
            .equalTo(this.currentUser.id).once("value", function (snapshots) {
            snapshots.forEach(function (element) {
                var pub = {};
                console.log(element.val());
                if (element.val().type == "annonce") {
                    _this.afDatabase.database.ref("/annonces/" + element.val().idAnnonce).once("value", function (annonceSnap) {
                        console.log(annonceSnap.val());
                        pub = annonceSnap.val();
                        if (pub.nbimage > 0) {
                            pub.imagesUrl = []; /**/
                            for (var i = 0; i < pub.nbimage; i++) {
                                _this.storageRef.child("annoncesimages/" + pub.idAnnonce + "/" + i + ".jpg").getDownloadURL().then(function (res) {
                                    pub.imagesUrl.push(res);
                                });
                            }
                            console.log(pub.imagesUrl);
                        }
                        //getting user
                        _this.afDatabase.database.ref("/users/" + annonceSnap.val().creatorAnnonceId).once("value", function (userSnap) {
                            pub.userDipslayName = userSnap.val().displayName;
                            console.log(pub);
                        });
                        pub.order = "sharingannonce";
                        pub.type = "annonce";
                        _this.publications.push(pub);
                        console.log(pub);
                        console.log(_this.publications);
                    });
                }
                return false;
            });
        });
    };
    ProfilePage.prototype.likePub = function (pub) {
        pub.liked = true;
        if (pub.order == "annonce") {
            this.afDatabase.list('/annonces/' + pub.idAnnonce + '/likes/').set(this.currentUser.id, {
                userId: this.currentUser.id
            });
        }
        else if (pub.order == "publication") {
            this.afDatabase.list('/publications/' + pub.key + '/likes/').set(this.currentUser.id, {
                userId: this.currentUser.id
            });
        }
    };
    ProfilePage.prototype.dislikePub = function (pub) {
        console.log(pub);
        pub.liked = false;
        if (pub.order == "annonce") {
            this.afDatabase.list('/annonces/' + pub.idAnnonce + '/likes/' + this.currentUser.id).remove();
        }
        else if (pub.order == "publication") {
            this.afDatabase.list('/publications/' + pub.key + '/likes/' + this.currentUser.id).remove();
        }
    };
    ProfilePage.prototype.isLiked = function (pub) {
        if (pub.order == "annonce") {
            var sLikes_1 = this.afDatabase.list("/annonces/" + pub.idAnnonce + "/likes/" + this.currentUser.id).valueChanges().subscribe(function (data) {
                console.log(data.length);
                if (data.length == 1) {
                    pub.liked = true;
                    console.log(pub.liked);
                }
                else {
                    pub.liked = false;
                    console.log(pub.liked);
                }
                sLikes_1.unsubscribe();
            });
        }
        else if (pub.order == "publication") {
            var sLikes_2 = this.afDatabase.list("/publications/" + pub.key + "/likes/" + this.currentUser.id).valueChanges().subscribe(function (data) {
                console.log(data.length);
                if (data.length == 1) {
                    pub.liked = true;
                    console.log(pub.liked);
                }
                else {
                    pub.liked = false;
                    console.log(pub.liked);
                }
                sLikes_2.unsubscribe();
            });
        }
    };
    ProfilePage.prototype.commenter = function (pub) {
        console.log("adding comment");
        console.log(pub.myComment);
        if (pub.order == "annonce") {
            var newRef = this.afDatabase.list('/annonces/' + pub.idAnnonce + '/comments/').push({});
            newRef.set({
                commentKey: newRef.key,
                userId: this.currentUser.id,
                commentContent: pub.myComment,
                date: __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.database.ServerValue.TIMESTAMP
            }).then(function () { pub.myComment = ""; });
        }
        else if (pub.order == "publication") {
            var newRef = this.afDatabase.list('/publications/' + pub.key + '/comments/').push({});
            newRef.set({
                commentKey: newRef.key,
                userId: this.currentUser.id,
                commentContent: pub.myComment,
                date: __WEBPACK_IMPORTED_MODULE_7_firebase___default.a.database.ServerValue.TIMESTAMP
            }).then(function () { pub.myComment = ""; });
        }
    };
    ProfilePage.prototype.openCommentsModal = function (pub) {
        if (pub.order == "annonce") {
            var commentsModalPage = this.modalController.create(__WEBPACK_IMPORTED_MODULE_5__comments_modal_comments_modal__["a" /* CommentsModalPage */], {
                "order": "annonce",
                "idAnnonce": pub.idAnnonce,
                "titleAnnonce": pub.titleAnnonce
            }).present();
        }
        else if (pub.order == "publication") {
            var commentsModalPage = this.modalController.create(__WEBPACK_IMPORTED_MODULE_5__comments_modal_comments_modal__["a" /* CommentsModalPage */], {
                "order": "publication",
                "idAnnonce": pub.key
            }).present();
        }
    };
    ProfilePage.prototype.showMore = function (pub) {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            buttons: [
                {
                    text: 'Supprimer',
                    handler: function () {
                        if (pub.order == "annonce") {
                            _this.deleteAnnonce(pub);
                        }
                        else {
                            console.log("rien a faire !!");
                        }
                    }
                }
            ]
        });
        actionSheet.present();
    };
    ProfilePage.prototype.deleteAnnonce = function (annonce) {
        var _this = this;
        this.annonceCrudProvider.deleteAnnonce(annonce).then(function () {
            var index = _this.publications.findIndex(function (item) { return item.idAnnonce == annonce.idAnnonce; });
            _this.publications.splice(index, 1);
            //delete images one by one
            for (var index_1 = 0; index_1 < annonce.nbimage; index_1++) {
                _this.storageRef.child("annoncesimages/" + annonce.idAnnonce + "/" + index_1 + ".jpg").delete();
            }
        });
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"/home/anwar/pfeHanimo/src/pages/profile/profile.html"*/'<ion-header>\n        <ion-toolbar class="toolbar-background ">\n                <button ion-button menuToggle>\n                        <ion-icon name="menu"></ion-icon>\n                      </button>\n                <ion-buttons end>\n                  <button ion-button icon-only  (click)="settings()">\n                    <ion-icon name="ios-settings-outline"></ion-icon>\n                  </button>\n                </ion-buttons>\n              </ion-toolbar> \n      \n</ion-header>\n\n\n<ion-content padding>\n<ion-card >\n    <ion-list >\n        <ion-item class="withAvatar"></ion-item>\n            <ion-item class="transparant">\n                <ion-avatar item-start>\n                    <img id="profile-image" src="../../assets/imgs/Moi.jpg">\n                </ion-avatar>\n                <ion-fab>\n                    <button ion-fab mini (click)="changePicture()">  <ion-icon name="md-camera"></ion-icon></button>\n                </ion-fab>\n            </ion-item>\n            <ion-item class="parttransparant">\n                <p >{{currentUser.displayName}}</p>      \n                <h5>Animal lover <ion-badge item-end> <ion-icon name="md-star" color="light"></ion-icon>20</ion-badge></h5>\n            </ion-item>\n            <ion-item>\n                <div padding>\n                    <ion-segment [(ngModel)]="userLog">\n                      <ion-segment-button value="monActivite">\n                        MON ACTIVITE\n                      </ion-segment-button>\n                      <ion-segment-button value="favoris">\n                        MES FAVORIS\n                      </ion-segment-button>\n                    </ion-segment>\n                  </div>\n            </ion-item>\n    </ion-list>\n</ion-card>\n<ion-card>\n<div [ngSwitch]="userLog">\n    <ion-list *ngSwitchCase="\'monActivite\'"  >\n        <ion-list *ngIf="publications" >\n            <ion-card *ngFor="let pub of publications" >\n                <ion-item>\n                    <ion-avatar item-start>\n                        <img src="{{currentUser.imageUrl}}">\n                    </ion-avatar>\n                    <ion-card-header *ngIf="pub.order == \'sharingannonce\'; else templateName" >\n                        <p>{{currentUser.displayName}} a partagé une {{pub.type}} de {{pub.userDipslayName}}</p>\n                    </ion-card-header>\n                    <p>{{pub.time}}</p>\n                    <ion-icon (click)="showMore(pub)" item-end name="ios-more"></ion-icon>\n                </ion-item>\n                <ng-template #templateName>\n                {{currentUser.displayName}} a partagé une {{pub.order}}\n                </ng-template>\n                <ion-row>\n                    <ion-slides zoom="true" pager>\n                        <ion-slide *ngFor="let img of pub.imagesUrl">\n                            <img style="width: 359px; height: 300px;" src="{{img}}">\n                        </ion-slide>\n                    </ion-slides>\n                </ion-row>\n                <ion-card-content>\n                    <p *ngIf="pub.order == \'annonce\'" >{{pub.descAnnonce}}</p>\n                    <p *ngIf="pub.order == \'publication\'" >{{pub.content}}</p>\n                </ion-card-content>\n                <ion-row> \n                    <ion-col *ngIf="!pub.liked" >\n                        <button (click)="likePub(pub)" ion-button icon-left clear small>\n                            <ion-icon name="ios-heart-outline"></ion-icon>\n                            <div>J\'aime</div>\n                        </button>\n                    </ion-col>\n                    <ion-col *ngIf="pub.liked" >\n                        <button (click)="dislikePub(pub)" ion-button icon-left clear small>\n                            <ion-icon name="ios-heart"></ion-icon>\n                            <div>J\'aime pas</div>\n                        </button>\n                    </ion-col>\n                    <ion-col>\n                        <button (click)="openCommentsModal(pub)" ion-button icon-left clear small>\n                            <ion-icon name="text"></ion-icon>\n                            <div>Commentaires</div>\n                        </button>\n                    </ion-col>\n                </ion-row>\n                <ion-item>\n                    <ion-input placeholder="ajouter un commentaire" [(ngModel)]="pub.myComment" item-start> </ion-input>\n                    <button ion-button (click)="commenter(pub)" item-end>COM</button>\n                </ion-item>\n            </ion-card>\n        </ion-list>\n        <ion-list *ngSwitchCase="\'favoris\'">\n            <ion-item>\n                <h2>favoris</h2>\n            </ion-item>\n        </ion-list>\n    </ion-list>\n</div>\n</ion-card>\n</ion-content>\n\n<!-- \n<img (click)="changePicture()" id="profile-image" src="{{currentUser.imageUrl}}">\n<button ion-button (click)="settings()">Parametere</button>\n\n<ion-list *ngIf="publications" >\n    <ion-card *ngFor="let pub of publications" >\n\n        <ion-item>\n            <ion-avatar item-start>\n              <img src="{{currentUser.imageUrl}}">\n            </ion-avatar>\n            <ion-card-header *ngIf="pub.order == \'sharingannonce\'; else templateName" >\n                <p>{{currentUser.displayName}} a partagé une {{pub.type}} de {{pub.userDipslayName}}</p>\n            </ion-card-header>\n            <p>{{pub.time}}</p>\n\n            <ion-icon (click)="showMore(pub)" item-end name="ios-more"></ion-icon>\n        </ion-item>\n\n        <ng-template #templateName>\n            {{currentUser.displayName}} a partagé une {{pub.order}}\n        </ng-template>\n\n        <ion-row>\n            <ion-slides zoom="true" pager>\n                <ion-slide *ngFor="let img of pub.imagesUrl">\n                    <img style="width: 359px; height: 300px;" src="{{img}}">\n                </ion-slide>\n            </ion-slides>\n        </ion-row>\n\n        <ion-card-content>\n            <p *ngIf="pub.order == \'annonce\'" >{{pub.descAnnonce}}</p>\n            <p *ngIf="pub.order == \'publication\'" >{{pub.content}}</p>\n        </ion-card-content>\n\n        <ion-row> -->\n            <!-- already commented\n            *ngIf="!isLiked(pub)"  -->\n            <!-- <ion-col *ngIf="!pub.liked" >\n                <button (click)="likePub(pub)" ion-button icon-left clear small>\n                <ion-icon name="ios-heart-outline"></ion-icon>\n                <div>J\'aime</div>\n                </button>\n            </ion-col> -->\n            <!-- already commented\n              *ngIf="isLiked(pub)"  -->\n            <!-- <ion-col *ngIf="pub.liked" >\n                <button (click)="dislikePub(pub)" ion-button icon-left clear small>\n                <ion-icon name="ios-heart"></ion-icon>\n                <div>J\'aime pas</div>\n                </button>\n            </ion-col>\n        \n            <ion-col>\n                <button (click)="openCommentsModal(pub)" ion-button icon-left clear small>\n                <ion-icon name="text"></ion-icon>\n                <div>Commentaires</div>\n                </button>\n            </ion-col>\n        \n        </ion-row>\n        \n            <ion-item>\n                <ion-input placeholder="ajouter un commentaire" [(ngModel)]="pub.myComment" item-start> </ion-input>\n                <button ion-button (click)="commenter(pub)" item-end>COM</button>\n            </ion-item>\n\n    </ion-card>\n</ion-list> -->\n'/*ion-inline-end:"/home/anwar/pfeHanimo/src/pages/profile/profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* ActionSheetController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_8__providers_usercrud_usercrud__["a" /* UsercrudProvider */],
            __WEBPACK_IMPORTED_MODULE_9__providers_annonce_crud_annonce_crud__["a" /* AnnonceCrudProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SettingsProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_usercrud_usercrud__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SettingsProfilePage = (function () {
    function SettingsProfilePage(navCtrl, navParams, usercrudProvider, afAuth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.usercrudProvider = usercrudProvider;
        this.afAuth = afAuth;
        this.currentUser = {};
        this.currentUser = JSON.parse(this.navParams.get("currentUser"));
        console.log(this.currentUser);
    }
    SettingsProfilePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SettingsProfilePage');
    };
    SettingsProfilePage.prototype.updateProfile = function (currentUser) {
        this.usercrudProvider.updateUserProfile(currentUser);
    };
    SettingsProfilePage.prototype.resetPassword = function () {
        var _this = this;
        var user = this.afAuth.auth.currentUser;
        console.log(user);
        user.updatePassword(this.newPassword).then(function (res) {
            console.log("mot de passe changé avec succes ", res);
            _this.afAuth.auth.signOut();
        });
    };
    SettingsProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-settings-profile',template:/*ion-inline-start:"/home/anwar/pfeHanimo/src/pages/settings-profile/settings-profile.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>settingsProfile</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  \n<!-- \n  <ion-item>\n      <ion-label fixed>Nom a afficher</ion-label>\n      <ion-input [(ngModel)]="currentUser.displayName" placeholder="{{currentUser.displayName}}"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label fixed>Description</ion-label>\n    <ion-input [(ngModel)]="currentUser.description" placeholder="{{currentUser.description}}"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label fixed>nom</ion-label>\n    <ion-input [(ngModel)]="currentUser.nom" placeholder="{{currentUser.nom}}" ></ion-input>\n  </ion-item> \n\n  <ion-item>\n    <ion-label fixed>prenom</ion-label>\n    <ion-input [(ngModel)]="currentUser.prenom" placeholder="{{currentUser.prenom}}"></ion-input>\n  </ion-item>\n\n  <ion-item>\n    <ion-label fixed>numero telephone</ion-label>\n    <ion-input [(ngModel)]="currentUser.tel" type="tel" placeholder="{{currentUser.tel}}"></ion-input>\n  </ion-item>\n\n  <button ion-button block (click)="updateProfile(currentUser)">Valider les modification</button> -->\n\n  <!-- seperator here -->\n<!-- \n  <div *ngIf="currentUser.connectionType == \'mail\'" >\n    <h2>Changer votre mot de passe</h2>\n\n    <ion-item>\n      <ion-label fixed>Ancien mot de passe</ion-label>\n      <ion-input [(ngModel)]="oldPassword"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label fixed>Nouveau mot de passe</ion-label>\n      <ion-input [(ngModel)]="newPassword"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label fixed>Confirmer votre nouveau mot de passe</ion-label>\n      <ion-input [(ngModel)]="confirmNewPassword"></ion-input>\n    </ion-item>\n\n    <button ion-button block (click)="resetPassword()">Changer mot de passe</button>\n  </div> -->\n\n\n</ion-content>\n'/*ion-inline-end:"/home/anwar/pfeHanimo/src/pages/settings-profile/settings-profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_usercrud_usercrud__["a" /* UsercrudProvider */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], SettingsProfilePage);
    return SettingsProfilePage;
}());

//# sourceMappingURL=settings-profile.js.map

/***/ }),

/***/ 353:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedbackPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__addfeedbackmodal_addfeedbackmodal__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FeedbackPage = (function () {
    function FeedbackPage(navCtrl, navParams, modalCtrl, afDatabase, afAuth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.afDatabase = afDatabase;
        this.afAuth = afAuth;
        this.currentUser = {};
        this.currentUser = this.afAuth.auth.currentUser;
    }
    FeedbackPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var sFeeds = this.afDatabase.database.ref("/feedback/")
            .orderByChild("senderId").equalTo(this.currentUser.uid).on("value", function (snapshots) {
            _this.feedbacks = [];
            snapshots.forEach(function (item) {
                _this.feedbacks.push(item.val());
                return false;
            });
        });
    };
    FeedbackPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FeedbackPage');
    };
    FeedbackPage.prototype.goToAddFeeback = function () {
        console.log("goToAddFeeback()");
        var feedbackModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__addfeedbackmodal_addfeedbackmodal__["a" /* AddfeedbackmodalPage */], { userId: 8675309 });
        feedbackModal.present();
    };
    FeedbackPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-feedback',template:/*ion-inline-start:"/home/anwar/pfeHanimo/src/pages/feedback/feedback.html"*/'\n<ion-header>\n  <ion-navbar>\n    <button ion-button icon-only menuToggle  >\n        <ion-icon name="menu"></ion-icon>\n    </button>\n  <ion-title>\n    Feedback\n  </ion-title>\n</ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-fab bottom right >\n      <button (click)="goToAddFeeback()" ion-fab><ion-icon ios="ios-add" md="md-add"></ion-icon></button>\n  </ion-fab>\n\n  <ion-list *ngIf="feedbacks" >\n    <ion-item *ngFor="let feed of feedbacks" >\n      <h2>{{feed.about}}</h2>   \n      <p>{{feed.contenu}}</p>\n    </ion-item>\n  </ion-list>\n  \n</ion-content>\n'/*ion-inline-end:"/home/anwar/pfeHanimo/src/pages/feedback/feedback.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], FeedbackPage);
    return FeedbackPage;
}());

//# sourceMappingURL=feedback.js.map

/***/ }),

/***/ 354:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddfeedbackmodalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AddfeedbackmodalPage = (function () {
    function AddfeedbackmodalPage(navCtrl, navParams, viewController, afDatabase, afAuth) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewController = viewController;
        this.afDatabase = afDatabase;
        this.afAuth = afAuth;
        this.feedBack = {};
        this.currentUser = {};
        this.currentUser = this.afAuth.auth.currentUser;
        console.log(this.currentUser);
    }
    AddfeedbackmodalPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AddfeedbackmodalPage');
    };
    AddfeedbackmodalPage.prototype.goBack = function () {
        this.viewController.dismiss();
    };
    AddfeedbackmodalPage.prototype.sendFeedback = function (feedBack) {
        console.log(feedBack);
        var newRef = this.afDatabase.list('/feedback/').push({});
        newRef.set({
            key: newRef.key,
            about: feedBack.about,
            contenu: feedBack.content,
            senderId: this.currentUser.uid,
            date: __WEBPACK_IMPORTED_MODULE_4_firebase___default.a.database.ServerValue.TIMESTAMP
        });
        this.goBack();
    };
    AddfeedbackmodalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-addfeedbackmodal',template:/*ion-inline-start:"/home/anwar/pfeHanimo/src/pages/addfeedbackmodal/addfeedbackmodal.html"*/'<!--\n  Generated template for the AddfeedbackmodalPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n        <ion-buttons start>\n            <button ion-button (click)="goBack()">\n                <ion-icon name="md-arrow-back"></ion-icon>\n            </button>\n        </ion-buttons>\n      <ion-title>Envoyer un feedback</ion-title>\n    </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n    <ion-item>\n        <ion-label floating >A propos</ion-label>\n        <ion-input [(ngModel)]="feedBack.about" type="text"> </ion-input>\n    </ion-item> \n\n    <ion-item>\n        <ion-label floating >Contenu</ion-label>\n        <ion-input [(ngModel)]="feedBack.content" type="text"> </ion-input>\n    </ion-item>\n\n    <ion-item>\n      <button ion-button (click)="sendFeedback(feedBack)" item-end>Envoyer</button>\n    </ion-item>\n\n</ion-content>\n'/*ion-inline-end:"/home/anwar/pfeHanimo/src/pages/addfeedbackmodal/addfeedbackmodal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], AddfeedbackmodalPage);
    return AddfeedbackmodalPage;
}());

//# sourceMappingURL=addfeedbackmodal.js.map

/***/ }),

/***/ 355:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(356);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(375);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_common_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_auth__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_google_plus__ = __webpack_require__(324);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_native_geolocation__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__ionic_native_facebook__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ionic_native_camera__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_google_maps__ = __webpack_require__(520);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_image_picker__ = __webpack_require__(521);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__ionic_native_location_accuracy__ = __webpack_require__(522);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_native_geocoder__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_fcm__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_diagnostic__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_media_capture__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_media__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_file__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_firebase__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_24_firebase__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__firebase_credentials__ = __webpack_require__(549);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__app_component__ = __webpack_require__(550);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_signup_signup__ = __webpack_require__(340);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_login_login__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_first_connection_first_connection__ = __webpack_require__(341);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_complete_profile_complete_profile__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_tabs_tabs__ = __webpack_require__(343);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_messages_messages__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_poster_poster__ = __webpack_require__(347);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_invitation_invitation__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_annonces_annonces__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__pages_search_search__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__pages_annonce_a0_annonce_a0__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__pages_annonce_a1_annonce_a1__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__pages_annonce_a3_annonce_a3__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__pages_annonce_a2_annonce_a2__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pages_conseil_modal_conseil_modal__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_publication_modal_publication_modal__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_comments_modal_comments_modal__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__pages_friends_friends__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__pages_profile_profile__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__pages_map_map__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__pages_settings_profile_settings_profile__ = __webpack_require__(352);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__pages_messaging_modal_messaging_modal__ = __webpack_require__(173);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__pages_otherprofile_otherprofile__ = __webpack_require__(166);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__pages_feedback_feedback__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__pages_addfeedbackmodal_addfeedbackmodal__ = __webpack_require__(354);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__providers_usercrud_usercrud__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__providers_annonce_crud_annonce_crud__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__providers_pubs_pubs__ = __webpack_require__(167);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










//native plugins














































__WEBPACK_IMPORTED_MODULE_24_firebase___default.a.initializeApp(__WEBPACK_IMPORTED_MODULE_25__firebase_credentials__["a" /* FIREBASE_CREDENTIALS */]);
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_26__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_27__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_first_connection_first_connection__["a" /* FirstConnectionPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_complete_profile_complete_profile__["a" /* CompleteProfilePage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_messages_messages__["a" /* MessagesPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_poster_poster__["a" /* PosterPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_invitation_invitation__["a" /* InvitationPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_annonces_annonces__["a" /* AnnoncesPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_annonce_a0_annonce_a0__["a" /* AnnonceA0Page */],
                __WEBPACK_IMPORTED_MODULE_40__pages_annonce_a3_annonce_a3__["a" /* AnnonceA3Page */],
                __WEBPACK_IMPORTED_MODULE_41__pages_annonce_a2_annonce_a2__["a" /* AnnonceA2Page */],
                __WEBPACK_IMPORTED_MODULE_39__pages_annonce_a1_annonce_a1__["a" /* AnnonceA1Page */],
                __WEBPACK_IMPORTED_MODULE_42__pages_conseil_modal_conseil_modal__["a" /* ConseilModalPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_publication_modal_publication_modal__["a" /* PublicationModalPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_comments_modal_comments_modal__["a" /* CommentsModalPage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_map_map__["a" /* MapPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_friends_friends__["a" /* FriendsPage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_settings_profile_settings_profile__["a" /* SettingsProfilePage */],
                __WEBPACK_IMPORTED_MODULE_49__pages_messaging_modal_messaging_modal__["a" /* MessagingModalPage */],
                __WEBPACK_IMPORTED_MODULE_50__pages_otherprofile_otherprofile__["a" /* OtherprofilePage */],
                __WEBPACK_IMPORTED_MODULE_51__pages_feedback_feedback__["a" /* FeedbackPage */],
                __WEBPACK_IMPORTED_MODULE_52__pages_addfeedbackmodal_addfeedbackmodal__["a" /* AddfeedbackmodalPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_26__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_14__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_7_angularfire2__["a" /* AngularFireModule */].initializeApp(__WEBPACK_IMPORTED_MODULE_25__firebase_credentials__["a" /* FIREBASE_CREDENTIALS */]),
                __WEBPACK_IMPORTED_MODULE_8_angularfire2_auth__["b" /* AngularFireAuthModule */],
                __WEBPACK_IMPORTED_MODULE_9_angularfire2_database__["b" /* AngularFireDatabaseModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_common_http__["b" /* HttpClientModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_26__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_27__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_first_connection_first_connection__["a" /* FirstConnectionPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_complete_profile_complete_profile__["a" /* CompleteProfilePage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_messages_messages__["a" /* MessagesPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_poster_poster__["a" /* PosterPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_invitation_invitation__["a" /* InvitationPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_annonces_annonces__["a" /* AnnoncesPage */],
                __WEBPACK_IMPORTED_MODULE_37__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_38__pages_annonce_a0_annonce_a0__["a" /* AnnonceA0Page */],
                __WEBPACK_IMPORTED_MODULE_40__pages_annonce_a3_annonce_a3__["a" /* AnnonceA3Page */],
                __WEBPACK_IMPORTED_MODULE_41__pages_annonce_a2_annonce_a2__["a" /* AnnonceA2Page */],
                __WEBPACK_IMPORTED_MODULE_39__pages_annonce_a1_annonce_a1__["a" /* AnnonceA1Page */],
                __WEBPACK_IMPORTED_MODULE_42__pages_conseil_modal_conseil_modal__["a" /* ConseilModalPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_publication_modal_publication_modal__["a" /* PublicationModalPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_comments_modal_comments_modal__["a" /* CommentsModalPage */],
                __WEBPACK_IMPORTED_MODULE_47__pages_map_map__["a" /* MapPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_friends_friends__["a" /* FriendsPage */],
                __WEBPACK_IMPORTED_MODULE_46__pages_profile_profile__["a" /* ProfilePage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_settings_profile_settings_profile__["a" /* SettingsProfilePage */],
                __WEBPACK_IMPORTED_MODULE_49__pages_messaging_modal_messaging_modal__["a" /* MessagingModalPage */],
                __WEBPACK_IMPORTED_MODULE_50__pages_otherprofile_otherprofile__["a" /* OtherprofilePage */],
                __WEBPACK_IMPORTED_MODULE_51__pages_feedback_feedback__["a" /* FeedbackPage */],
                __WEBPACK_IMPORTED_MODULE_52__pages_addfeedbackmodal_addfeedbackmodal__["a" /* AddfeedbackmodalPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_media__["a" /* Media */],
                __WEBPACK_IMPORTED_MODULE_23__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_53__providers_usercrud_usercrud__["a" /* UsercrudProvider */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_google_plus__["a" /* GooglePlus */],
                __WEBPACK_IMPORTED_MODULE_12__ionic_native_facebook__["a" /* Facebook */],
                __WEBPACK_IMPORTED_MODULE_13__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_11__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_google_maps__["a" /* GoogleMaps */],
                __WEBPACK_IMPORTED_MODULE_54__providers_annonce_crud_annonce_crud__["a" /* AnnonceCrudProvider */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_image_picker__["a" /* ImagePicker */],
                __WEBPACK_IMPORTED_MODULE_17__ionic_native_location_accuracy__["a" /* LocationAccuracy */],
                __WEBPACK_IMPORTED_MODULE_18__ionic_native_native_geocoder__["a" /* NativeGeocoder */],
                __WEBPACK_IMPORTED_MODULE_55__providers_pubs_pubs__["a" /* PubsProvider */],
                __WEBPACK_IMPORTED_MODULE_15__ionic_native_google_maps__["b" /* Spherical */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_media_capture__["a" /* MediaCapture */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_fcm__["a" /* FCM */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_diagnostic__["a" /* Diagnostic */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_diagnostic__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http___ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__search_search__ = __webpack_require__(344);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__conseil_modal_conseil_modal__ = __webpack_require__(345);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__publication_modal_publication_modal__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__annonce_a0_annonce_a0__ = __webpack_require__(168);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__annonce_a3_annonce_a3__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__annonce_a2_annonce_a2__ = __webpack_require__(170);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__annonce_a1_annonce_a1__ = __webpack_require__(171);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_angularfire2_auth__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__providers_usercrud_usercrud__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_geolocation__ = __webpack_require__(50);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//for notifications













var HomePage = (function () {
    function HomePage(navCtrl, modalCtrl, http, storage, afAuth, afDatabase, userProvider, geolocation, diagnostic) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.http = http;
        this.storage = storage;
        this.afAuth = afAuth;
        this.afDatabase = afDatabase;
        this.userProvider = userProvider;
        this.geolocation = geolocation;
        this.diagnostic = diagnostic;
        this.pubType = "pub";
        this.currentUser = {};
        this.afAuth.auth.onAuthStateChanged(function (user) {
            if (user) {
                _this.currentUser.id = user.uid;
                console.log("modifying user position");
                _this.gettingPosition();
                console.log(_this.currentUser.id);
            }
            else {
                console.log("Erreur de chargement");
            }
        });
    }
    //go to search page
    HomePage.prototype.rootSearch = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__search_search__["a" /* SearchPage */]);
    };
    HomePage.prototype.getFriendList = function () {
        var _this = this;
        console.log("getting friend list : ");
        this.afDatabase.list("/friends/").valueChanges().subscribe(function (data) {
            _this.myFriends = data;
            console.log("my friends : " + _this.myFriends);
            _this.friendList = [];
            _this.myFriends.forEach(function (element) {
                console.log("element : " + element);
                console.log("element sender id : " + element.senderId);
                _this.afDatabase.object("/users/" + element.senderId).valueChanges().subscribe(function (data) {
                    _this.friendList.push(data);
                });
            });
        });
        this.showFriend();
    };
    HomePage.prototype.showFriend = function () {
        this.friendList.forEach(function (element) {
            console.log("elemnt user nchallah : " + element);
            console.log("elemnt user name nchallah : " + element.displayName);
        });
    };
    HomePage.prototype.updateReputation = function () {
        this.userProvider.updateReputation(this.currentUser.id, 5);
    };
    HomePage.prototype.getPosition = function () {
        console.log(this.pos);
    };
    HomePage.prototype.gettingPosition = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (resp) {
            _this.userProvider.updateUserPosition(_this.currentUser.id, resp.coords);
            console.log("access position given");
            console.log(resp);
            _this.pos = resp;
        }).catch(function (error) {
            _this.navCtrl.pop();
            console.log('Error getting location', error);
        });
    };
    HomePage.prototype.openConseilModal = function () {
        var thisModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_7__conseil_modal_conseil_modal__["a" /* ConseilModalPage */], { "currentUserId": this.currentUser.id });
        thisModal.present();
    };
    HomePage.prototype.openPublicationModal = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__publication_modal_publication_modal__["a" /* PublicationModalPage */], { "currentUserId": this.currentUser.id });
        /* let thisModal = this.modalCtrl.create(PublicationModalPage,{"currentUserId":this.currentUser.id});
        thisModal.present(); */
    };
    HomePage.prototype.loadHome = function () {
    };
    HomePage.prototype.sendNotification = function () {
        var body = {
            "notification": {
                "title": "New Notification has arrived",
                "body": "Notification Body",
                "sound": "default",
                "click_action": "FCM_PLUGIN_ACTIVITY",
                "icon": "fcm_push_icon"
            },
            "data": {
                "param1": "value1",
                "param2": "value2"
            },
            "to": "/topics/matchday",
            "priority": "high",
            "restricted_package_name": ""
        };
        var options = new __WEBPACK_IMPORTED_MODULE_5__angular_common_http__["c" /* HttpHeaders */]().set('Content-Type', 'application/json');
        this.http.post("https://fcm.googleapis.com/fcm/send", body, {
            headers: options.set('Authorization', 'key=AAAA96ZF_R0:APA91bFQZUbbPmXhGZp09l_cjxeZVxzt_n-bkMqktzNrzwictuEKsdSOjxVMj9FAb4U2J6Io-2GbSuVO9-4FElsHZGMh7pXbfoIc3wijAPMXN0Eb5YgZZCAgjbfixwwc0smv2hPMp76-'),
        })
            .subscribe();
    };
    HomePage.prototype.goToA0 = function () {
        var _this = this;
        this.diagnostic.isLocationEnabled().then(function (res) {
            if (res == true) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__annonce_a0_annonce_a0__["a" /* AnnonceA0Page */]);
            }
            else {
                alert("Veuillez activez votre gps");
            }
        });
    };
    HomePage.prototype.goToA1 = function () {
        var _this = this;
        this.diagnostic.isLocationEnabled().then(function (res) {
            if (res == true) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_12__annonce_a1_annonce_a1__["a" /* AnnonceA1Page */]);
            }
            else {
                alert("Veuillez activez votre gps");
            }
        });
    };
    HomePage.prototype.goToA2 = function () {
        var _this = this;
        this.diagnostic.isLocationEnabled().then(function (res) {
            if (res == true) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_11__annonce_a2_annonce_a2__["a" /* AnnonceA2Page */]);
            }
            else {
                alert("Veuillez activez votre gps");
            }
        });
    };
    HomePage.prototype.goToA3 = function () {
        var _this = this;
        this.diagnostic.isLocationEnabled().then(function (res) {
            if (res == true) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__annonce_a3_annonce_a3__["a" /* AnnonceA3Page */]);
            }
            else {
                alert("Veuillez activez votre gps");
            }
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/anwar/pfeHanimo/src/pages/home/home.html"*/'<ion-header> \n    <ion-toolbar class="toolbar-background ">\n      <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      <ion-title class="title-logo">Hanimo</ion-title> \n      <ion-buttons end>\n        <button ion-button icon-only (click)="rootSearch()"  >\n          <ion-icon name="search"></ion-icon>\n        </button>\n      </ion-buttons>\n    </ion-toolbar> \n  </ion-header>\n\n<ion-content>\n  <!-- this fab is placed at bottom right -->\n  <ion-fab bottom right>\n    <button ion-fab id="cancel" ><ion-icon name="ios-create-outline" color="light"></ion-icon></button>\n    <ion-fab-list side="top">\n      <button (click)="openConseilModal()" ion-fab id="conseil">  <ion-icon name="md-alert" color="light"></ion-icon>\n\n        <ion-label>Conseil</ion-label></button>\n      <button (click)="openPublicationModal()" ion-fab id="pub"><img src="assets/imgs/autre.png">\n        <ion-label>Publication</ion-label></button>\n      <button (click)="goToA3()" ion-fab id="a3"><img src="assets/imgs/aide.png">\n        <ion-label>Besoin d\'aide</ion-label></button>\n      <button (click)="goToA2()" ion-fab id="a2"><img src="assets/imgs/foyer.png">\n        <ion-label>Cherche foyer</ion-label></button>\n      <button (click)="goToA1()" ion-fab id="a1"><img src="assets/imgs/maladie.png">\n        <ion-label>Blessure/Maladie</ion-label></button>\n      <button (click)="goToA0()" ion-fab id="a0"><img src="assets/imgs/danger.png">\n        <ion-label>En danger</ion-label></button>\n    </ion-fab-list>\n  </ion-fab>\n  <ion-card >\n    <ion-item>\n      <ion-avatar item-start class="edit" ><img src="assets/imgs/Moi.jpg"></ion-avatar>\n      <h3>Anwar Hemdene</h3>\n      <p>05/11/1955 -24:24 </p><ion-badge class="besoin"item-end>Besoin d\'aide</ion-badge>\n    </ion-item>\n    <!--> galerie slider -->\n    <ion-row>\n      \n      <ion-slides pager>\n        <ion-slide>\n          <img src="assets/imgs/animal1.jpeg">\n          <button outline>\n              <ion-fab right bottom class="marker"><img src="assets/imgs/marker.png"></ion-fab> \n          </button>\n                   \n        </ion-slide>\n        <ion-slide>\n          <img src="assets/imgs/animal2.jpeg">\n          <ion-fab right bottom class="marker"><img src="assets/imgs/marker.png"></ion-fab>\n        </ion-slide>\n        \n      </ion-slides>\n      \n    </ion-row>\n    <ion-card-content>\n      <p>Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.</p>\n    \n<ul class="flex-container flex-start">      <li class="flex-item">\n        <button ion-button icon-left clear >\n          <div class="like">\n              <img src="assets/imgs/like.png"></div>  \n        </button>\n      </li>\n      <li class="flex-item">\n        <button ion-button icon-left clear >\n          <div class="comment">\n              <img src="assets/imgs/comment.png"></div>  \n        </button>\n      </li>\n      <li class="flex-item">\n        <button ion-button icon-left clear >\n          <div class="share">\n            <img  src="assets/imgs/share.png">\n          </div>  \n        </button>\n      </li>\n    </ul>\n  </ion-card-content>\n  </ion-card>    \n\n<!-- <button (click)="signOut()" ion-button block>Sign Out</button>\n<button (click)="getFriendList()" ion-button block>Friend List</button>\n<button (click)="showFriend()" ion-button block>show Friend List</button>\n<button (click)="updateReputation()" ion-button block>updateReputation</button>\n<button (click)="getPosition()" ion-button block>getPosition</button> -->\n<!-- <button (click)="sendNotification()" ion-button block>sendNotification</button> -->\n</ion-content>'/*ion-inline-end:"/home/anwar/pfeHanimo/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http___["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_14_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_13_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_15__providers_usercrud_usercrud__["a" /* UsercrudProvider */],
            __WEBPACK_IMPORTED_MODULE_16__ionic_native_geolocation__["a" /* Geolocation */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_diagnostic__["a" /* Diagnostic */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 549:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FIREBASE_CREDENTIALS; });
var FIREBASE_CREDENTIALS = {
    apiKey: "AIzaSyCiNoZY4g5LoI8w3QzXEKES-sQMkLovxO8",
    authDomain: "hanimo-3b761.firebaseapp.com",
    databaseURL: "https://hanimo-3b761.firebaseio.com",
    projectId: "hanimo-3b761",
    storageBucket: "hanimo-3b761.appspot.com",
    messagingSenderId: "1063646526749"
};
//# sourceMappingURL=firebase.credentials.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnnonceCrudProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var AnnonceCrudProvider = (function () {
    function AnnonceCrudProvider(http, afDatabase) {
        this.http = http;
        this.afDatabase = afDatabase;
        this.annonce = {};
        console.log('Hello AnnonceCrudProvider Provider');
    }
    AnnonceCrudProvider.prototype.addingAnnonce = function (annonce, captureData) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var ref;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.afDatabase.database.ref('/annonces/')];
                    case 1:
                        ref = _a.sent();
                        console.log("annonce from provider : ");
                        console.log(annonce);
                        annonce.date = __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database.ServerValue.TIMESTAMP;
                        return [4 /*yield*/, ref.push(annonce).then(function (res) {
                                console.log(res.key);
                                var key = res.key;
                                annonce.idAnnonce = key;
                                _this.afDatabase.database.ref('/annonces/' + annonce.idAnnonce).update(annonce).then(function (res) {
                                    console.log("finished adding annonce");
                                    console.log(res);
                                }).then(function () {
                                    var _loop_1 = function (index) {
                                        console.log("captureData[index] : ");
                                        console.log(captureData[index]);
                                        _this.uploadImage(captureData[index], annonce.idAnnonce, index).then(function () { index++; });
                                        out_index_1 = index;
                                    };
                                    var out_index_1;
                                    for (var index = 0; index < captureData.length; index++) {
                                        _loop_1(index);
                                        index = out_index_1;
                                    }
                                    // captureData.length()
                                    // captureData.forEach(captureDataUrl => {
                                    //   this.uploadImage(captureDataUrl,annonce.idAnnonce,index).then(()=>{index++;});
                                    // });
                                });
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AnnonceCrudProvider.prototype.commentAnnonce = function (idAnnonce, commentContent, idUser) {
        return __awaiter(this, void 0, void 0, function () {
            var newRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newRef = this.afDatabase.list('/annonces/' + idAnnonce + '/comments/').push({});
                        return [4 /*yield*/, newRef.set({
                                commentKey: newRef.key,
                                userId: idUser,
                                commentContent: commentContent,
                                date: __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database.ServerValue.TIMESTAMP
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AnnonceCrudProvider.prototype.likePub = function (annonceId, userId) {
        this.afDatabase.list('/annonces/' + annonceId + '/likes/').set(userId, {
            userId: userId
        });
    };
    AnnonceCrudProvider.prototype.dislikePub = function (annonceId, userId) {
        this.afDatabase.list('/annonces/' + annonceId + '/likes/' + userId).remove();
    };
    AnnonceCrudProvider.prototype.uploadImage = function (captureDataUrl, idAnnonce, i) {
        return __awaiter(this, void 0, void 0, function () {
            var storageRef, filename, imageRef;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.storage().ref("annoncesimages/" + idAnnonce + "/")];
                    case 1:
                        storageRef = _a.sent();
                        filename = i + ".jpg";
                        imageRef = storageRef.child(filename);
                        return [4 /*yield*/, imageRef.putString(captureDataUrl, __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.storage.StringFormat.DATA_URL).then(function (snap) {
                                console.log("image added : " + snap);
                                console.log(snap);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AnnonceCrudProvider.prototype.deleteAnnonce = function (annonce) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.afDatabase.list('/annonces/' + annonce.idAnnonce).remove()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AnnonceCrudProvider.prototype.reportAnnonce = function (idAnnonce, reporterId) {
        return __awaiter(this, void 0, void 0, function () {
            var newRef;
            return __generator(this, function (_a) {
                newRef = this.afDatabase.list("/reportedAnnonce/").push({});
                newRef.set({
                    key: newRef.key,
                    idAnnonce: idAnnonce,
                    reporterId: reporterId,
                    date: __WEBPACK_IMPORTED_MODULE_3_firebase___default.a.database.ServerValue.TIMESTAMP
                });
                return [2 /*return*/];
            });
        });
    };
    AnnonceCrudProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */]])
    ], AnnonceCrudProvider);
    return AnnonceCrudProvider;
}());

//# sourceMappingURL=annonce-crud.js.map

/***/ }),

/***/ 550:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_fcm__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(165);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_home_home__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_invitation_invitation__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_messages_messages__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_annonces_annonces__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_friends_friends__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_profile_profile__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_feedback_feedback__ = __webpack_require__(353);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
















var MyApp = (function () {
    function MyApp(platform, statusBar, afDatabase, loadCnt, storage, splashScreen, afAuth, fcm) {
        var _this = this;
        this.afDatabase = afDatabase;
        this.storage = storage;
        this.afAuth = afAuth;
        this.fcm = fcm;
        this.currentUser = {
            imageUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAM1BMVEUKME7///+El6bw8vQZPVlHZHpmfpHCy9Ojsbzg5ekpSmTR2N44V29XcYayvsd2i5yTpLFbvRYnAAAJcklEQVR4nO2d17arOgxFs+kkofz/154Qmg0uKsuQccddT/vhnOCJLclFMo+//4gedzcApf9B4srrusk+GsqPpj+ypq7zVE9LAdLWWVU+Hx69y2FMwAMGyfusLHwIpooyw9IAQfK+8naDp3OGHvZ0FMhrfPMgVnVjC2kABOQ1MLvi0DEIFj1ILu0LU2WjNRgtSF3pKb4qqtd9IHmjGlJHlc09IHlGcrQcPeUjTAySAGNSkQlRhCCJMGaUC0HSYUx6SmxFAtJDTdylsr4ApC1TY0yquKbCBkk7qnYVzPHFBHkBojhVJWviwgPJrsP4qBgTgbQXdsesjm4pDJDmIuswVZDdFx0ENTtkihoeqSDXD6tVxOFFBHndMKxWvUnzexpIcx/Gg2goJJDhVo6PCMGRAnKTmZuKm3wcJO/upphUqUHy29yVrRhJDORXOKIkEZDf4YiRhEF+iSNCEgb5KY4wSRDkB/yurUEG8nMcocgYABnvbrVL3nMIP0h/d5udKnwzSC/InfPdkJ6eWb0PJE++dyVVyQP5iQmWW27X5QG5druEKafBu0Hqu9saVOHa8HKC/K6BzHKZiRMEZCDF0Nd1/ZfXI/fcOibHOssFgokg9uFA20BhztHEAZIjIohrD/o1wljeFBDEwBo8YUt5Ir/rNLjOIACPFdy/AbEcPdcJBOCxytjeYAM4Kzp6rhOIPhRGNzwmFP3rOoTFI0irtnQKx6fj1Zt+h9njEUS9mKJxfFRrX5lt7wcQtaWTOfTHeIXVJQcQrRW+OYex2j0a66XZINoO8a7fPH2iHF2mC7ZBtB3Czb5QvjizSx7A3308mRzqAwujSywQbYfwc0iU8zqjS0yQ6ztEHX9332KCaGNIYB/Qq1z3yN0oDZBWyeFYJBCkm2sXLhDtpKFwNDMu5TnrZpYGiHbK4Nlwikg5DrYV1g6iPoJmzE5MKd/fOp53EPUaQZaLqH3u+vo2ELWp3wSyWuYGoj9EEIJoV3L9AUS/ZLsJpLNBXmqOu0CW6P5A/dx9IL0FAji/FYKot9EqE0Tvs6QBUe/2CxMEkZAlBNGPhdoAQWyTSmbxUwvUygwQyMmniAPgLt87CODXHuftWJIQgzrfQDC5AfwSgz9MmmG/gWCOqDgZ4JsQeTvZBoJJDhAFEsSDyxUEEUUekk0UEMhjBcEcGsoWVpBU3NcCgkkPkJWrKbdRZvULCMTWhYEdMrayBQRyqHcnSLmAIH7LcWJ8Hch7BsHEdWFpJsZjziCgFBpZ9TPm4e0XBJTTJKt9xjy8RoLI4gimPLP5goCSgWTrEcyzsy8IqmZVMo0H5bJiQToBCOjZ5RcElhjLN3dU7uQMAvoxwQkJZKI1CQzCthJYEigahHuDDi4rFwzCPQ7F1fiDQZgTR5iJwEGYRgIsiECD8BwwMAEfDcIaW8CRBQdhjS1kJQEchDEFhiRKr4KDFPS9FGQNVwEHoW83QjsEHdkfnuIOl6C1NjMItiaCaCWgbdpFJXQ9soh2uoB9aJcCxFdgZwlcrTmvENGlrITBBdpK25Qhd1F2RScq8CKu/gsCL8qN5THjy+Rr5E6joYgPxpdl518QrCf8Kpgjn6C8HLkbb+vt7ZM8wdVvy258khsRfHaS5DalDnlidZT7Erk+SXV5Bj1D3LS29XyhVJuoKHs9Q8S6reK11oUc7vPcr9uswP3SLiDINefXOF5rwCuGzVT6zVkVPfh2wWmHcz4wAwba2cgN1/Tsvleu7//i69CgVyt1GwjOs2+XK3rtbl151Tg3vOeioG40Mz2V+6pQ4xbJHOZj6g0EMxk93tV7fuedvVZpQSPhbwNBGInrymGrwNh1GXmL8F+lAaJ+NU/fzcmvJqvKj7177+1v1GY/GiBKI1Fdy/2XK6upXwaIJpI8B/399W0mH9zzafKaeCF9J0WF+jyCuFusTGzZKhFH8dVLZql2brxgcdVBKb7KG/7UZTmB3XJ6uL/QYT5ScRI74FcHEJ7feopyfGkaeaGlPoCw/BbjZmSBWIvINQNmTxdjWJqwUI8sztR4nYPuIPSTSUnOCZOE3ierqRoJfNSQxDjLEYs8i91eqgFCDSWiFHiuqAN9CwEGCPEISVjvwhS7Mfx6dtX8kC5aqvneGBOEFN2v6RBiYwr3DQOkLhEW6fHFbIwFQnkLiWYmZxE220z/aedPx99C+hiyKR4OzNFhg8S75CJTnxQ1dyugHTLaY10iu9dBpmhQtMz1ABLrkgtHVnRsPUO3OcU25i8cWdGxZbflCBKJqBdMs3aF/dYhNexU9RFcYEmLXYQKghyWdufyldBSU3KpjkKhZclxTXQGCTkL/HZDUIH5+Gkt4SgoCtj7pSYSNJLTK3VVRnmXZxebSMBIzmHABeIdXBebiN9eHYtUZ62ab3BdGkUm+SKJw1bdRXeewaX7qqdAnljg2sVxg3guAk3baofcg9yZ2eZpnHNvSFrEqhB9YPjesmt0pt6Xc8hl7W5L9Q4Xx09ctsrd5VhWeF6nF8SRrZdw49qns//0xTK/AZ8vGr3caTliuzeFNeCJTgafpKlhHd2WP1sy1LqDF798gjKJPLqDr9keoTd43+NyNzC1CI8Xy2lcPtOaVBI5IiAWyQ3e125AcKoXs2Djhy5eVc3KiBxREIPkhjBiLhIjU++4T91IbggjRiCJLSEIwWGddkEaxlVN5KCArPHk8mXVpHk8FHH7JL3n5dPA7C90q7XkeFJucacNmGXeRfswLE71HA79efaGiCN/Ofjmfmtcp8X10tIsqCacV5xfRWjNUiXGYbovWgyFYHcQLak15K9oM5zqmgaeKsHJetbSHfSPzXOiw/rxE9YH4CXaUpsZ0ztemFurP95Jpyvrd29YTpIZr7cEJHqfc7Wl0PFm2+yJR70udaokKFtGPTdm8WdQe24+HmVLlueboWQquBcYYVH2vEzfh8kCks1p90eWsLCyZ8qK7E86Oe+3XYFnBuiWdth20UqZR5SvMoyPg3WNauJipi0LMTQgVq5xUUlZcrPsopPHJ926z8pm7xyFLrH/PxpHSoXKdWgXsLn1scZn1ZDd/2vszN3lt254qkE+qu3yoqLM+ghN3Qz2qcVzUC/ZMFsK/alU6l0OWV/bQz6v6yYbyuN5BaZ4A7Y30vs/PPksS2+qzlvfF7OQmzzcL7W+xa7OIfRuVdtn/tdvdFLnL4OTKcm2W16PmWc4FWWXNSlWM2n3D+uPxuyrcfo74aP+Ac30a82+oLmfAAAAAElFTkSuQmCC"
        };
        this.authState = false;
        platform.ready().then(function () {
            //Notifications
            if (platform.is("cordova")) {
                fcm.subscribeToTopic('matchday');
                fcm.getToken().then(function (token) {
                    console.log(token);
                });
                fcm.onNotification().subscribe(function (data) {
                    if (data.wasTapped) {
                        console.log("Received in background");
                    }
                    else {
                        console.log("Received in foreground");
                    }
                    ;
                });
                fcm.onTokenRefresh().subscribe(function (token) {
                    console.log(token);
                });
            }
            else {
                console.log("platform is browser !! ");
            }
            //end notifications.  
            statusBar.styleDefault();
            splashScreen.hide();
        });
        this.currentUser.displayName = "chargement ..";
        this.currentUser.imageUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAM1BMVEUKME7///+El6bw8vQZPVlHZHpmfpHCy9Ojsbzg5ekpSmTR2N44V29XcYayvsd2i5yTpLFbvRYnAAAJcklEQVR4nO2d17arOgxFs+kkofz/154Qmg0uKsuQccddT/vhnOCJLclFMo+//4gedzcApf9B4srrusk+GsqPpj+ypq7zVE9LAdLWWVU+Hx69y2FMwAMGyfusLHwIpooyw9IAQfK+8naDp3OGHvZ0FMhrfPMgVnVjC2kABOQ1MLvi0DEIFj1ILu0LU2WjNRgtSF3pKb4qqtd9IHmjGlJHlc09IHlGcrQcPeUjTAySAGNSkQlRhCCJMGaUC0HSYUx6SmxFAtJDTdylsr4ApC1TY0yquKbCBkk7qnYVzPHFBHkBojhVJWviwgPJrsP4qBgTgbQXdsesjm4pDJDmIuswVZDdFx0ENTtkihoeqSDXD6tVxOFFBHndMKxWvUnzexpIcx/Gg2goJJDhVo6PCMGRAnKTmZuKm3wcJO/upphUqUHy29yVrRhJDORXOKIkEZDf4YiRhEF+iSNCEgb5KY4wSRDkB/yurUEG8nMcocgYABnvbrVL3nMIP0h/d5udKnwzSC/InfPdkJ6eWb0PJE++dyVVyQP5iQmWW27X5QG5druEKafBu0Hqu9saVOHa8HKC/K6BzHKZiRMEZCDF0Nd1/ZfXI/fcOibHOssFgokg9uFA20BhztHEAZIjIohrD/o1wljeFBDEwBo8YUt5Ir/rNLjOIACPFdy/AbEcPdcJBOCxytjeYAM4Kzp6rhOIPhRGNzwmFP3rOoTFI0irtnQKx6fj1Zt+h9njEUS9mKJxfFRrX5lt7wcQtaWTOfTHeIXVJQcQrRW+OYex2j0a66XZINoO8a7fPH2iHF2mC7ZBtB3Czb5QvjizSx7A3308mRzqAwujSywQbYfwc0iU8zqjS0yQ6ztEHX9332KCaGNIYB/Qq1z3yN0oDZBWyeFYJBCkm2sXLhDtpKFwNDMu5TnrZpYGiHbK4Nlwikg5DrYV1g6iPoJmzE5MKd/fOp53EPUaQZaLqH3u+vo2ELWp3wSyWuYGoj9EEIJoV3L9AUS/ZLsJpLNBXmqOu0CW6P5A/dx9IL0FAji/FYKot9EqE0Tvs6QBUe/2CxMEkZAlBNGPhdoAQWyTSmbxUwvUygwQyMmniAPgLt87CODXHuftWJIQgzrfQDC5AfwSgz9MmmG/gWCOqDgZ4JsQeTvZBoJJDhAFEsSDyxUEEUUekk0UEMhjBcEcGsoWVpBU3NcCgkkPkJWrKbdRZvULCMTWhYEdMrayBQRyqHcnSLmAIH7LcWJ8Hch7BsHEdWFpJsZjziCgFBpZ9TPm4e0XBJTTJKt9xjy8RoLI4gimPLP5goCSgWTrEcyzsy8IqmZVMo0H5bJiQToBCOjZ5RcElhjLN3dU7uQMAvoxwQkJZKI1CQzCthJYEigahHuDDi4rFwzCPQ7F1fiDQZgTR5iJwEGYRgIsiECD8BwwMAEfDcIaW8CRBQdhjS1kJQEchDEFhiRKr4KDFPS9FGQNVwEHoW83QjsEHdkfnuIOl6C1NjMItiaCaCWgbdpFJXQ9soh2uoB9aJcCxFdgZwlcrTmvENGlrITBBdpK25Qhd1F2RScq8CKu/gsCL8qN5THjy+Rr5E6joYgPxpdl518QrCf8Kpgjn6C8HLkbb+vt7ZM8wdVvy258khsRfHaS5DalDnlidZT7Erk+SXV5Bj1D3LS29XyhVJuoKHs9Q8S6reK11oUc7vPcr9uswP3SLiDINefXOF5rwCuGzVT6zVkVPfh2wWmHcz4wAwba2cgN1/Tsvleu7//i69CgVyt1GwjOs2+XK3rtbl151Tg3vOeioG40Mz2V+6pQ4xbJHOZj6g0EMxk93tV7fuedvVZpQSPhbwNBGInrymGrwNh1GXmL8F+lAaJ+NU/fzcmvJqvKj7177+1v1GY/GiBKI1Fdy/2XK6upXwaIJpI8B/399W0mH9zzafKaeCF9J0WF+jyCuFusTGzZKhFH8dVLZql2brxgcdVBKb7KG/7UZTmB3XJ6uL/QYT5ScRI74FcHEJ7feopyfGkaeaGlPoCw/BbjZmSBWIvINQNmTxdjWJqwUI8sztR4nYPuIPSTSUnOCZOE3ierqRoJfNSQxDjLEYs8i91eqgFCDSWiFHiuqAN9CwEGCPEISVjvwhS7Mfx6dtX8kC5aqvneGBOEFN2v6RBiYwr3DQOkLhEW6fHFbIwFQnkLiWYmZxE220z/aedPx99C+hiyKR4OzNFhg8S75CJTnxQ1dyugHTLaY10iu9dBpmhQtMz1ABLrkgtHVnRsPUO3OcU25i8cWdGxZbflCBKJqBdMs3aF/dYhNexU9RFcYEmLXYQKghyWdufyldBSU3KpjkKhZclxTXQGCTkL/HZDUIH5+Gkt4SgoCtj7pSYSNJLTK3VVRnmXZxebSMBIzmHABeIdXBebiN9eHYtUZ62ab3BdGkUm+SKJw1bdRXeewaX7qqdAnljg2sVxg3guAk3baofcg9yZ2eZpnHNvSFrEqhB9YPjesmt0pt6Xc8hl7W5L9Q4Xx09ctsrd5VhWeF6nF8SRrZdw49qns//0xTK/AZ8vGr3caTliuzeFNeCJTgafpKlhHd2WP1sy1LqDF798gjKJPLqDr9keoTd43+NyNzC1CI8Xy2lcPtOaVBI5IiAWyQ3e125AcKoXs2Djhy5eVc3KiBxREIPkhjBiLhIjU++4T91IbggjRiCJLSEIwWGddkEaxlVN5KCArPHk8mXVpHk8FHH7JL3n5dPA7C90q7XkeFJucacNmGXeRfswLE71HA79efaGiCN/Ofjmfmtcp8X10tIsqCacV5xfRWjNUiXGYbovWgyFYHcQLak15K9oM5zqmgaeKsHJetbSHfSPzXOiw/rxE9YH4CXaUpsZ0ztemFurP95Jpyvrd29YTpIZr7cEJHqfc7Wl0PFm2+yJR70udaokKFtGPTdm8WdQe24+HmVLlueboWQquBcYYVH2vEzfh8kCks1p90eWsLCyZ8qK7E86Oe+3XYFnBuiWdth20UqZR5SvMoyPg3WNauJipi0LMTQgVq5xUUlZcrPsopPHJ926z8pm7xyFLrH/PxpHSoXKdWgXsLn1scZn1ZDd/2vszN3lt254qkE+qu3yoqLM+ghN3Qz2qcVzUC/ZMFsK/alU6l0OWV/bQz6v6yYbyuN5BaZ4A7Y30vs/PPksS2+qzlvfF7OQmzzcL7W+xa7OIfRuVdtn/tdvdFLnL4OTKcm2W16PmWc4FWWXNSlWM2n3D+uPxuyrcfo74aP+Ac30a82+oLmfAAAAAElFTkSuQmCC";
        this.pages = [
            { title: 'Home', component: __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */] },
            { title: 'Les annonces', component: __WEBPACK_IMPORTED_MODULE_12__pages_annonces_annonces__["a" /* AnnoncesPage */] },
            { title: 'amis', component: __WEBPACK_IMPORTED_MODULE_13__pages_friends_friends__["a" /* FriendsPage */] },
            { title: 'Invitations', component: __WEBPACK_IMPORTED_MODULE_10__pages_invitation_invitation__["a" /* InvitationPage */] },
            { title: 'Messages', component: __WEBPACK_IMPORTED_MODULE_11__pages_messages_messages__["a" /* MessagesPage */] },
            { title: 'Vos Feedback', component: __WEBPACK_IMPORTED_MODULE_15__pages_feedback_feedback__["a" /* FeedbackPage */] },
        ];
        var loader = loadCnt.create({
            content: "Attente de connexion ..."
        });
        loader.present().then(function () {
            try {
                _this.verifAuthState().then(function () {
                    console.log("hhhhh");
                    loader.dismissAll();
                });
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    MyApp.prototype.verifAuthState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.afAuth.auth.onAuthStateChanged(function (user) {
                            if (user) {
                                /*
                                this.afDatabase.database.ref("/users/"+user.uid).update({connected: true}).then(res => {
                                  
                                }); */
                                _this.getUser(user.uid);
                                _this.authState = true;
                                _this.rootPage = __WEBPACK_IMPORTED_MODULE_9__pages_home_home__["a" /* HomePage */]; // tabsPage is replaced by home page
                                console.log('auth state changed');
                                console.log(user);
                            }
                            else {
                                _this.authState = false;
                                console.log("auth state changed erru");
                                _this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
                            }
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // viewWillLeave(){
    //   if(this.currentUser.id){
    //     this.afDatabase.database.ref("/users/"+this.currentUser.id).update({connected: false}).then(res => {
    //     });
    //   }
    // }
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.getUser = function (id) {
        var _this = this;
        var usersRef = this.afDatabase.database.ref("/users/" + id);
        usersRef.on("value", function (snap) {
            _this.currentUser = snap.val();
            console.log(_this.currentUser);
        });
    };
    MyApp.prototype.goToProfile = function () {
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_14__pages_profile_profile__["a" /* ProfilePage */]);
    };
    MyApp.prototype.Deconnexion = function () {
        var _this = this;
        this.storage.clear().then(function (res) {
            _this.afAuth.auth.signOut().then(function () {
                console.log("sign out : " + res);
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/anwar/pfeHanimo/src/app/app.html"*/'<ion-menu [content]="content" >\n    <ion-header  >\n      <ion-toolbar  color="primary" >\n        <ion-title>Menu</ion-title>\n      </ion-toolbar>\n    </ion-header>\n  \n    <ion-content>\n      <ion-list>\n          \n          <ion-list (click)="goToProfile()" class="profile" no-lines>\n                  <ion-item >\n                    <ion-avatar item-start>\n                      <img src="{{currentUser.imageUrl}}">\n                    </ion-avatar><br>\n                    \n                  </ion-item>\n                  <ion-item>\n                      <h2 > {{currentUser.displayName}}</h2>\n                  </ion-item>\n            </ion-list>\n        <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n          \n          {{p.title}}\n        </button>\n        <button menuClose ion-item (click)="Deconnexion()">          \n          Deconnexion\n        </button>\n      </ion-list>\n    </ion-content>\n  \n  </ion-menu>\n\n  <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/home/anwar/pfeHanimo/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_8_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
            __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_fcm__["a" /* FCM */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommentsModalPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__ = __webpack_require__(13);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CommentsModalPage = (function () {
    function CommentsModalPage(navCtrl, navParams, afDatabase, viewController) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afDatabase = afDatabase;
        this.viewController = viewController;
        this.comments = [];
        this.order = this.navParams.get("order");
        console.log("order : ", this.order);
        this.idAnnonce = this.navParams.get("idAnnonce");
        console.log("id annonce : ", this.idAnnonce);
        this.titleAnnonce = this.navParams.get("titleAnnonce");
        console.log("titleAnnonce : ", this.titleAnnonce);
        this.loadComments();
    }
    CommentsModalPage.prototype.loadComments = function () {
        var _this = this;
        console.log('ionViewDidLoad CommentsModalPage');
        if (this.order == "annonce") {
            this.sComments = this.afDatabase.list("/annonces/" + this.idAnnonce + "/comments")
                .valueChanges().subscribe(function (data) {
                _this.comments = [];
                console.log("all data :");
                console.log(data);
                data.forEach(function (element) {
                    var comment = element;
                    console.log("comment");
                    console.log(comment);
                    _this.afDatabase.database.ref("/users/" + comment.userId).once("value", function (snap) {
                        comment.displayName = snap.val().displayName;
                        comment.avaterUrl = snap.val().imageUrl;
                        console.log(comment);
                        _this.comments.push(comment);
                    });
                });
            });
        }
        else if (this.order == "publication") {
            this.sComments = this.afDatabase.list("/publications/" + this.idAnnonce + "/comments")
                .valueChanges().subscribe(function (data) {
                _this.comments = [];
                console.log("all data :");
                console.log(data);
                data.forEach(function (element) {
                    var comment = element;
                    console.log("comment");
                    console.log(comment);
                    _this.afDatabase.database.ref("/users/" + comment.userId).once("value", function (snap) {
                        comment.displayName = snap.val().displayName;
                        comment.avaterUrl = snap.val().imageUrl;
                        console.log(comment);
                        _this.comments.push(comment);
                    });
                });
            });
        }
    };
    CommentsModalPage.prototype.dismissModal = function () {
        this.sComments.unsubscribe();
        this.viewController.dismiss();
    };
    CommentsModalPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-comments-modal',template:/*ion-inline-start:"/home/anwar/pfeHanimo/src/pages/comments-modal/comments-modal.html"*/'<ion-content padding>\n\n  <button ion-button block (click)="dismissModal()" >{{titleAnnonce}}</button>\n  <ion-list *ngIf="comments" >\n\n    <ion-item *ngFor="let comment of comments" >\n\n      <ion-avatar item-start>\n        <img src="{{comment.avaterUrl}}">\n      </ion-avatar>\n\n      <h2>{{comment.displayName}}</h2>\n\n      <h3>{{comment.commentContent}}</h3>\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n'/*ion-inline-end:"/home/anwar/pfeHanimo/src/pages/comments-modal/comments-modal.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_database__["a" /* AngularFireDatabase */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ViewController */]])
    ], CommentsModalPage);
    return CommentsModalPage;
}());

//# sourceMappingURL=comments-modal.js.map

/***/ })

},[355]);
//# sourceMappingURL=main.js.map