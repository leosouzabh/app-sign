import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiService } from '../../app/service/api.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { Base64 } from '@ionic-native/base64';
import { ToastController, LoadingController, Loading, AlertController  } from 'ionic-angular';


@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	url:String = '';
	loading:Loading;

	constructor(public navCtrl: NavController, private camera: Camera 
		,private _apiService: ApiService
		,private crop: Crop
		,private base64: Base64
		,private loadingCtrl: LoadingController
		,private alertCtrl: AlertController
		,private toastCtrl: ToastController
		) {

	}

	showAlert(titulo:string, msg:string) {
		
		const alert = this.toastCtrl.create({
			//title: titulo,
			message: msg,
			duration: 15000,
    		position: 'bottom'
		});
		alert.present();
  	}

	mock(){
		this.presentLoadingText();
		this._apiService.mockPost()
			.subscribe(res => {
				this.montaUrl(res['identificador']);
				this.montaMsgResultado(res['resultado']);
				this.loading.dismiss();

			}, fail => {
				console.error(fail);
				this.url = 'http://35.196.124.122:5000/static/20180714_191356-644823/__resultado.jpg';
				this.showAlert('Erro', 'Algo aconteceu de errado!');
				this.loading.dismiss();
			}
	 ); 
		
	}

	private montaMsgResultado(resultado:boolean){
		let titulo:string = 'Sucesso';
		let msg:string = 'Assinaturas validadas e conferidas!!';
		if (resultado == false){
			titulo = 'Erro'	;
			msg = 'Assinaturas não conferem!!';
		}
		this.showAlert(titulo, msg);
	}

	private montaUrl(identificador:String){
		this.url = `http://35.196.124.122:5000/static/${identificador}/__resultado.jpg`;
	}

	captura(){
		const options: CameraOptions = {
				quality: 100,
				destinationType: this.camera.DestinationType.DATA_URL,
				encodingType: this.camera.EncodingType.JPEG,
				mediaType: this.camera.MediaType.PICTURE,
				correctOrientation: true
		};
		
		this.presentLoadingText();

		this.camera.getPicture(options)
			.then((dataImage) => {
				this._apiService.postImage(dataImage)
					.subscribe(res => {
						console.log(res);
						this.montaUrl(res['imagem'][1]);
						this.montaMsgResultado(res['imagem'][0]);
						this.loading.dismiss();

					}, fail => {
						console.error(fail);
						this.showAlert('Erro', 'Algo aconteceu de errado!');
						this.loading.dismiss();
					});

					
				
			}, (err) => {
				console.log('Erro no http')
				console.log(err)
			});

		//console.info();

	}


	presentLoadingText() {
		this.url = '#';
		this.loading = this.loadingCtrl.create({
			//spinner: 'hide',
			content: 'Validando assinatura...'
		});

		this.loading.present();
	}

}
