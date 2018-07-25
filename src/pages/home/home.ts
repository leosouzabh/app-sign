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


	private montaMsgResultadoVerificacao(resultado:boolean){
		let titulo:string = 'Sucesso';
		let msg:string = 'Assinaturas validadas e conferidas!!';
		if (resultado == false){
			titulo = 'Erro'	;
			msg = 'Assinaturas não conferem!!';
		}
		this.showAlert(titulo, msg);
	}

	private montaUrl(identificador:String, image:String){
		this.url = `http://${this._apiService.getUrl()}/static/${identificador}/${image}`;
	}

	capturaFromCamera(){
		this.processaImagem(1);
	}
	capturaFromGaleria(){
		this.processaImagem(2);
	}
	private processaImagem(source:number){
	
		const options: CameraOptions = {
				quality: 100,
				destinationType: this.camera.DestinationType.DATA_URL,
				encodingType: this.camera.EncodingType.JPEG,
				mediaType: this.camera.MediaType.PICTURE,
				sourceType: source,
				correctOrientation: true
		};
		
		this.camera.getPicture(options)
			.then((dataImage) => {
				this.presentLoadingText();
				this._apiService.postImage(dataImage)
					.subscribe(res => {
						this.trataResultado(res);
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

	private trataResultado(json) {
		console.log(json);
		if (json["erro"] == true){
			this.showAlert('Erro', json['message']);
			this.montaUrl(json['identificador'], 'identificadas_ass.jpg');

		} else {
			this.montaMsgResultadoVerificacao(json['resultado']);
			this.montaUrl(json['identificador'], '__resultado.jpg');
		}

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
