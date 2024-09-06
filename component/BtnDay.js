import * as React from 'react'
import { Text, View } from 'react-native'

export default function BtnDay(props){
    return (
      <View style={{flex:1,flexDirection:'row'}}>
        <View style={{flex:1}}>
          <Text> กลางวัน </Text>
        </View>
        
        <View style={{flex:1}}>
          <Text> กลางคืน </Text>
        </View>
      </View>
    )
  }
