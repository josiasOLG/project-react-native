/* eslint-disable prettier/prettier */
import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { styles } from './Camera.styles';
import { useDispatch, useSelector } from 'react-redux';
import { addDataCamera } from '../../../../redux/actions/camera-actions';
import { useNavigation } from '@react-navigation/native';
import { TipoDocumento } from '../../../../services/enums/tipo-documento';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import * as ImageManipulator from 'expo-image-manipulator';

type CameraType = 'back' | 'front';

interface CameraScreenProps {
  cameraType: CameraType;
  texto: string;
}

const CameraView: React.FC<CameraScreenProps> = ({ cameraType, texto }) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState<CameraType>('back');
  const [imagem, setimagem] = useState<any>('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [ratio, setRatio] = useState<string>('4:3');
  const [textoTela, setTextoTela] = useState<string>('');
  const [imagensArray, setImagensArray] = useState<any[]>([]);
  const [cameraReady, setCameraReady] = useState(false);
  const dispatch = useDispatch();
  const [zoom, setZoom] = useState(0); // Adicione esta linha
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const cameraRef = useRef<Camera | null>(null);
  const dataTipoDocumentos = useSelector((state) => state.tipoDocumento.valor);
  const [filePermissionsChecked, setFilePermissionsChecked] = useState(false);

  useEffect(() => {
    switch (dataTipoDocumentos) {
      case TipoDocumento.Cnh.toString():
        setTextoTela('da sua CNH');
        break;
      case TipoDocumento.Rh.toString():
        setTextoTela('do seu RH');
        break;
      case TipoDocumento.Documentos.toString():
        setTextoTela('do seu Documento');
        break;
      default:
    }
  }, []);

  const steps = [
    { text: 'Fotografe a frente ' + textoTela, cameraType: 'back' },
    { text: 'Fotografe a verso ' + textoTela, cameraType: 'back' },
    { text: 'Olhe para câmera e foque seu rosto. . .', cameraType: 'front' },
  ];

  const checkFilePermissions = async (): Promise<boolean> => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === 'granted';
  };
  useEffect(() => {
    const checkPermissions = async () => {
      const hasPermissions = await checkFilePermissions();
      setHasPermission(hasPermissions);
      setFilePermissionsChecked(true);
    };
    checkPermissions();
  }, []);

  const saveImageToPermanentStorage = async (photoUri) => {
    if (FileSystem.documentDirectory) {
      const newUri = FileSystem.documentDirectory + new Date().getTime() + '.jpg';
      await FileSystem.copyAsync({
        from: photoUri,
        to: newUri
      });
      return newUri;
    } else {
      throw new Error("Could not access the document directory");
    }
  }

  const reduzirImage = async (imageUri: string | null) => {
    if (imageUri === null) {
      throw new Error('Image URI is null');
    }
    const manipResult = await ImageManipulator.manipulateAsync(
      imageUri,
      [{ resize: { width: 500, height: 500 } }],
      { format: ImageManipulator.SaveFormat.JPEG, compress: 0.8, base64: true }
    );
    return manipResult.base64;
  };

  const takePicture = async () => {
    setIsLoading(true);
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.5 });
      try {
        const newPhotoUri = await saveImageToPermanentStorage(photo.uri);
        const base64Image = await reduzirImage(newPhotoUri);
        setPhotoUri(newPhotoUri);
        setimagem(photo.uri);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        // Trate o erro como você preferir
      }
    }
  };

  const handleFacesDetected = ({ faces }) => {
    if (faces.length > 0) {
      setTimeout(() => {
        takePicture();
      }, 2000);
    }
  };

  const retakePicture = () => {
    setPhotoUri(null);
    setIsLoading(false);
  };

  const adicionarImagem = (novaImagem: any) => {
    setImagensArray((imagensAntigas) => [...imagensAntigas, novaImagem]);
  };

  useEffect(() => {
    if (imagensArray.length > 0) {
      dispatch(addDataCamera('dados', imagensArray));
      if (currentStep === 2) {
        navigation.navigate('EnvioImagensView');
      }
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
        setPhotoUri(null);
        setType(steps[currentStep + 1].cameraType as CameraType);
        setIsLoading(false);
      }
    }
  }, [imagensArray]);

  const ok = () => {
    adicionarImagem(imagem);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const onCameraReady = async () => {
    setCameraReady(true);
    if (cameraRef.current) {
      const ratios = await cameraRef.current.getSupportedRatiosAsync();
      if (ratios.includes('20:9')) {
        setRatio('20:9');
      } else if (ratios.includes('16:9')) {
        setRatio('16:9');
      } else if (ratios.includes('4:3')) {
        setRatio('4:3');
      } else {
        console.log('No preferred ratio found, using default');
      }
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (photoUri) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: photoUri }} style={styles.camera} />
        <TouchableOpacity style={styles.buttonImagem} onPress={retakePicture}>
          <Text style={styles.buttonImagem.textButton}>
            Tirar foto novamente
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonImagem, styles.backAzul]}
          onPress={ok}
        >
          <Text
            style={[
              styles.buttonImagem.textButton,
              styles.buttonImagem.colorWhite,
            ]}
          >
            Ok
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={cameraRef}
        ratio={ratio}
        onCameraReady={onCameraReady}
        zoom={zoom}
        onFacesDetected={type === 'front' ? handleFacesDetected : undefined}
        faceDetectorSettings={{
          mode: FaceDetector.FaceDetectorMode.fast,
          detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
          runClassifications: FaceDetector.FaceDetectorClassifications.all,
          minDetectionInterval: 100,
          tracking: true,
        }}
      >
        {isLoading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#FCD057" />
          </View>
        )}

        <View style={styles.frame}>
          <Text style={styles.texto}>{steps[currentStep].text}</Text>
        </View>
        {type === 'front' && (
          <View style={[styles.guidelines, styles.centerContainer]}>
            <Image style={styles.imageCenter}
            source={require('../../../../assets/images/reconhecimento-de-rosto.png')}
            resizeMode='contain'
            />
          </View>
        )}
        {type === 'back' && <View style={styles.guidelines} />}
      </Camera>
      <TouchableOpacity
        style={styles.button}
        disabled={isLoading}
        onPress={takePicture}
      >
        <Image source={require('../../../../assets/images/btn-foto.png')} />
      </TouchableOpacity>
    </View>
  );
};

export default CameraView;
