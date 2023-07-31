/* eslint-disable prettier/prettier */
import React, { Fragment, useState } from 'react';
import { styles } from './TermosDeUso.style';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ListRenderItemInfo,
  StatusBar,
} from 'react-native';
import { Switch } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../../../services/interfaces/user-agreements.interface';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import meusDadosService from '../../../services/meus-dados.service';
import {
  convertDatePtBrToUs,
  formatarCPF,
  formatarCelular,
  formatarData,
} from '../../../services/utils';

interface IDataItem {
  id: string;
  label: string;
  value: string;
}

const TermosDeUsoView: React.FC = () => {
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
  const [user, setUser] = useState<any>({});
  const dadosReceber = useSelector(
    (state: RootState) => state.dataLogin.dataLogin
  );
  const navigation = useNavigation();
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const response: any = await meusDadosService.get('users/user');
          const data: IDataItem[] = [
            { id: '1', label: 'E-mail:', value: response.data.email },
            {
              id: '2',
              label: 'Celular:',
              value: formatarCelular(response.data.phoneNumber),
            },
            { id: '3', label: 'Cpf:', value: formatarCPF(response.data.cpf) },
            {
              id: '4',
              label: 'Data de nascimento:',
              value: formatarData(response.data.birthDate),
            },
          ];
          setUser(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }, [])
  );

  const renderHeader = () => '';
  const renderItem = ({ item }: ListRenderItemInfo<IDataItem>) => '';

  const renderFooter = () => (
    <View style={styles.footer}>
      <Text style={styles.footerText}>
      CONSIGAKI {'\n'}{'\n'}

Atualizado em 27 de abril de 2021.
{'\n'}{'\n'}

AVISO DE USO DE LICENÇAS DE CÓDIGO ABERTO
O aplicativo do Banco Inter S.A. (“App” e “Inter”) poderá incluir softwares de código aberto, os quais são usados e distribuídos de acordo com a licença específica sob a qual o software de código aberto é distribuído. Embora as informações contidas neste documento sejam consideradas completas e precisas, o Inter não oferece nenhuma garantia e não assume qualquer responsabilidade em relação a tais informações. Os softwares de código aberto, bem como as respectivas licenças aplicáveis, estão identificados abaixo.
{'\n'}{'\n'}

Se você tiver alguma dúvida sobre o software de código aberto contido no App, envie um e-mail para licenses@bancointer.com.br. No assunto de seu e-mail, por favor insira: “Open Source Software”.
{'\n'}{'\n'}

Esta declaração é feita em nome do Banco Inter S.A. e qualquer uma de suas subsidiárias.
{'\n'}{'\n'}

LICENÇAS DE CÓDIGO ABERTO E AVISOS DE DIREITOS AUTORAIS
A lista abaixo elenca os softwares de código aberto empregados no App por tipo de licença de software aplicável, acompanhados do nome do desenvolvedor e respectivo site.
{'\n'}{'\n'}
- - - -
{'\n'}{'\n'}
Os seguintes componentes estão licenciados sob a Apache License 2.0, reproduzida logo abaixo em seu inteiro teor:
{'\n'}{'\n'}
{'\n'}* AWSCore, Amazon Web Services, https://github.com/aws-amplify/aws-sdk-ios
{'\n'}* AWSS3, Amazon Web Services, https://github.com/aws-amplify/aws-sdk-ios
{'\n'}* Charts, Daniel Cohen Gindi, https://github.com/danielgindi/Charts
{'\n'}* FBLPromises, Google LLC, https://github.com/firebase/firebase-ios-sdk
{'\n'}* FIRAnalyticsConnector, Google LLC, https://github.com/firebase/firebase-ios-sdk
{'\n'}* Firebase, Google LLC, https://github.com/firebase/firebase-ios-sdk
{'\n'}* FirebaseABTesting, Google LLC, https://github.com/firebase/firebase-ios-sdk
{'\n'}* FirebaseAnalytics, Google LLC, https://github.com/firebase/firebase-ios-sdk
{'\n'}* FirebaseAnalyticsInterop, Google LLC, https://github.com/firebase/firebase-ios-sdk
{'\n'}* FirebaseCore, Google LLC, https://github.com/firebase/firebase-ios-sdk
{'\n'}* FirebaseCoreDiagnostics, Google LLC, https://github.com/firebase/firebase-ios-sdk
{'\n'}* FirebaseCoreDiagnosticsInterop, Google LLC, https://github.com/firebase/firebase-ios-sdk
{'\n'}* FirebaseCrashlytics, Google LLC, https://github.com/firebase/firebase-ios-sdk
{'\n'}* FirebaseInAppMessaging, Google LLC, https://github.com/firebase/firebase-ios-sdk
{'\n'}* FirebaseInstallations, Google LLC, https://github.com/firebase/firebase-ios-sdk
{'\n'}* FirebaseInstanceID, Google LLC, https://github.com/firebase/firebase-ios-sdk
{'\n'}* FirebaseMessaging, Google LLC, https://github.com/firebase/firebase-ios-sdk
{'\n'}* GoogleAppMeasurement, Google LLC, https://github.com/google/GoogleAppMeasurement
{'\n'}* GoogleDataTransport, Google LLC, https://github.com/firebase/firebase-ios-sdk/tree/master/GoogleDataTransport
{'\n'}* GoogleDataTransportCCTSupport, Google LLC, https://github.com/firebase/firebase-ios-sdk
{'\n'}* GoogleToolboxForMac, Google LLC, https://github.com/google/google-toolbox-for-mac
{'\n'}* GoogleUtilities, Google LLC, https://github.com/firebase/firebase-ios-sdk/tree/master/GoogleUtilities
{'\n'}* GoogleUtilitiesComponents, Google LLC, https://github.com/firebase/firebase-ios-sdk/tree/master/GoogleUtilitiesComponents
{'\n'}* GTMSessionFetcher, Google LLC, https://github.com/google/gtm-session-fetcher
{'\n'}* InAppMessagingDisplayResources, Google LLC, https://github.com/firebase/firebase-ios-sdk
{'\n'}* Intercom, Intercom Inc, https://github.com/intercom/intercom-ios
{'\n'}* Lottie, Airbnb Inc, https://github.com/airbnb/lottie-ios
{'\n'}* MagazineLayout, Airbnb Inc, https://github.com/airbnb/MagazineLayout
{'\n'}* MLKit, Google LLC, https://github.com/googlecodelabs/mlkit-ios
{'\n'}* MLKitCommon, Google LLC, https://github.com/googlecodelabs/mlkit-ios
{'\n'}* MLKitFaceDetection, Google LLC, https://github.com/googlecodelabs/mlkit-ios
{'\n'}* MLKitFaceDetectionResources, Google LLC, https://github.com/googlecodelabs/mlkit-ios
{'\n'}* MLKitVision, Google LLC, https://github.com/googlecodelabs/mlkit-ios
{'\n'}* opencv2, OpenCV team, https://github.com/opencv/opencv
{'\n'}* Protobuf, Google LLC, https://github.com/protocolbuffers/protobuf
{'\n'}{'\n'}
Apache License Version 2.0, January 2004
http://www.apache.org/licenses/
{'\n'}{'\n'}
TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION
{'\n'}{'\n'}
1. Definitions.
{'\n'}"License" shall mean the terms and conditions for use, reproduction, and distribution as defined by Sections 1 through 9 of this document.
   {'\n'}"Licensor" shall mean the copyright owner or entity authorized by the copyright owner that is granting the License.
   {'\n'}"Legal Entity" shall mean the union of the acting entity and all other entities that control, are controlled by, or are under common control with that entity. For the purposes of this definition, "control" means (i) the power, direct or indirect, to cause the direction or management of such entity, whether by contract or otherwise, or (ii) ownership of fifty percent (50%) or more of the outstanding shares, or (iii) beneficial ownership of such entity.
   {'\n'}"You" (or "Your") shall mean an individual or Legal Entity exercising permissions granted by this License.
   {'\n'}"Source" form shall mean the preferred form for making modifications, including but not limited to software source code, documentation source, and configuration files.
   {'\n'}"Object" form shall mean any form resulting from mechanical transformation or translation of a Source form, including but not limited to compiled object code, generated documentation, and conversions to other media types.
   {'\n'}"Work" shall mean the work of authorship, whether in Source or Object form, made available under the License, as indicated by a copyright notice that is included in or attached to the work (an example is provided in the Appendix below).
   {'\n'}"Derivative Works" shall mean any work, whether in Source or Object form, that is based on (or derived from) the Work and for which the editorial revisions, annotations, elaborations, or other modifications represent, as a whole, an original work of authorship. For the purposes of this License, Derivative Works shall not include works that remain separable from, or merely link (or bind by name) to the interfaces of, the Work and Derivative Works thereof.
   {'\n'}"Contribution" shall mean any work of authorship, including the original version of the Work and any modifications or additions to that Work or Derivative Works thereof, that is intentionally submitted to Licensor for inclusion in the Work by the copyright owner or by an individual or Legal Entity authorized to submit on behalf of the copyright owner. For the purposes of this definition, "submitted" means any form of electronic, verbal, or written communication sent to the Licensor or its representatives, including but not limited to communication on electronic mailing lists, source code control systems, and issue tracking systems that are managed by, or on behalf of, the Licensor for the purpose of discussing and improving the Work, but excluding communication that is conspicuously marked or otherwise designated in writing by the copyright owner as "Not a Contribution."
   {'\n'}"Contributor" shall mean Licensor and any individual or Legal Entity on behalf of whom a Contribution has been received by Licensor and subsequently incorporated within the Work.
   {'\n'}{'\n'}
2. Grant of Copyright License.
   Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare Derivative Works of, publicly display, publicly perform, sublicense, and distribute the Work and such Derivative Works in Source or Object form.
   {'\n'}{'\n'}
3. Grant of Patent License.
   Subject to the terms and conditions of this License, each Contributor hereby grants to You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable (except as stated in this section) patent license to make, have made, use, offer to sell, sell, import, and otherwise transfer the Work, where such license applies only to those patent claims licensable by such Contributor that are necessarily infringed by their Contribution(s) alone or by combination of their Contribution(s) with the Work to which such Contribution(s) was submitted. If You institute patent litigation against any entity (including a cross-claim or counterclaim in a lawsuit) alleging that the Work or a Contribution incorporated within the Work constitutes direct or contributory patent infringement, then any patent licenses granted to You under this License for that Work shall terminate as of the date such litigation is filed.
   {'\n'}{'\n'}
4. Redistribution.
   You may reproduce and distribute copies of the Work or Derivative Works thereof in any medium, with or without modifications, and in Source or Object form, provided that You meet the following conditions:
   (a) You must give any other recipients of the Work or Derivative Works a copy of this License; and
   {'\n'}(b) You must cause any modified files to carry prominent notices stating that You changed the files; and
   {'\n'}(c) You must retain, in the Source form of any Derivative Works that You distribute, all copyright, patent, trademark, and attribution notices from the Source form of the Work, excluding those notices that do not pertain to any part of the Derivative Works; and
   {'\n'}(d) If the Work includes a "NOTICE" text file as part of its distribution, then any Derivative Works that You distribute must include a readable copy of the attribution notices contained within such NOTICE file, excluding those notices that do not pertain to any part of the Derivative Works, in at least one of the following places: within a NOTICE text file distributed as part of the Derivative Works; within the Source form or documentation, if provided along with the Derivative Works; or, within a display generated by the Derivative Works, if and wherever such third-party notices normally appear. The contents of the NOTICE file are for informational purposes only and do not modify the License. You may add Your own attribution notices within Derivative Works that You distribute, alongside or as an addendum to the NOTICE text from the Work, provided that such additional attribution notices cannot be construed as modifying the License.
   {'\n'}{'\n'}
5. Submission of Contributions.
   Unless You explicitly state otherwise, any Contribution intentionally submitted for inclusion in the Work by You to the Licensor shall be under the terms and conditions of this License, without any additional terms or conditions. Notwithstanding the above, nothing herein shall supersede or modify the terms of any separate license agreement you may have executed with Licensor regarding such Contributions.
   {'\n'}{'\n'}
6. Trademarks.
   This License does not grant permission to use the trade names, trademarks, service marks, or product names of the Licensor, except as required for reasonable and customary use in describing the origin of the Work and reproducing the content of the NOTICE file.
   {'\n'}{'\n'}
7. Disclaimer of Warranty.
   Unless required by applicable law or agreed to in writing, Licensor provides the Work (and each Contributor provides its Contributions) on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied, including, without limitation, any warranties or conditions of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A PARTICULAR PURPOSE. You are solely responsible for determining the appropriateness of using or redistributing the Work and assume any risks associated with Your exercise of permissions under this License.
   {'\n'}{'\n'}
8. Limitation of Liability.
   In no event and under no legal theory, whether in tort (including negligence), contract, or otherwise, unless required by applicable law (such as deliberate and grossly negligent acts) or agreed to in writing, shall any Contributor be liable to You for damages, including any direct, indirect, special, incidental, or consequential damages of any character arising as a result of this License or out of the use or inability to use the Work (including but not limited to damages for loss of goodwill, work stoppage, computer failure or malfunction, or any and all other commercial damages or losses), even if such Contributor has been advised of the possibility of such damages.
   {'\n'}{'\n'}
9. Accepting Warranty or Additional Liability.
   While redistributing the Work or Derivative Works thereof, You may choose to offer, and charge a fee for, acceptance of support, warranty, indemnity, or other liability obligations and/or rights consistent with this License. However, in accepting such obligations, You may act only on Your own behalf and on Your sole responsibility, not on behalf of any other Contributor, and only if You agree to indemnify, defend, and hold each Contributor harmless for any liability incurred by, or claims asserted against, such Contributor by reason of your accepting any such warranty or additional liability.
   {'\n'}{'\n'}
END OF TERMS AND CONDITIONS

      </Text>
    </View>
  );

  const handleBackPress = () => {
    navigation.navigate('HomeView');
  };

  return (
    <Fragment>
      <StatusBar backgroundColor="#FCD057" barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.topo}>
          <View style={styles.col1}>
            <TouchableOpacity onPress={handleBackPress}>
              <Image
                source={require('../../../assets/images/seta-direita-preta.png')}
                resizeMode="contain"
                style={styles.topo.image}
              />
            </TouchableOpacity>
          </View>
          <View style={[styles.col10, styles.topo.centerContent]}>
            <Text style={styles.titulo}>Termos de uso</Text>
          </View>
          <View style={styles.col1} />
        </View>
        <FlatList
          ListHeaderComponent={renderHeader}
          data={user}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ListFooterComponent={renderFooter}
        />
      </View>
    </Fragment>
  );
};

export default TermosDeUsoView;
