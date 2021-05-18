import React from 'react'
import {useNavigation, useRoute} from '@react-navigation/native'
import {View, Image, TouchableOpacity, Text, Linking} from 'react-native'
import {Feather} from '@expo/vector-icons'
import * as MailComposer from 'expo-mail-composer'

import styles from './styles.js'
import logoImg from '../../assets/logo.png'

export default function Detail(){
  const navigation = useNavigation()
  const route = useRoute()

  const incident = route.params.incident

  const message = `Olá, ${incident.name}. Estou entrando em contato, pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}`

  function navigateBack(){
    navigation.goBack()
  }

  function sendMail(incident){
    MailComposer.composeAsync({
      subject: `Herói do caso: ${incident.title}`,//assunto
      recipients: [incident.email],//destinatário
      body: message
    })
  }

  function sendWhatsApp(){
    Linking.openURL(`whatsapp://send?phone=${incident.phone}&text=${message}`)
  }

  return(
    <View style={styles.container}>
      <View style= {styles.header}>
        <Image source={logoImg}/>
        
        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e02041"/>
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
        <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

        <Text style={styles.incidentProperty}>CASO:</Text>
        <Text style={styles.incidentValue}>{incident.title}a</Text>

        <Text style={styles.incidentProperty}>VALOR:</Text>
        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>

      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Salve o dia</Text>
        <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
        <Text style={styles.heroDescription}>Entre em contato:</Text>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
            <Text style={styles.actionText}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={() => sendMail(incident)}>
            <Text style={styles.actionText}>E-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}