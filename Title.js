import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

const colors = {
  light: "#EDEFF3",
  lightAlt: "#6F8C8F",
  primary: "#464E5D",
  darkAlt: "#4995df",
  dark: "#161F1E"
}

export default class Title extends Component {
  render(props) {
    return (
      <View>
        <Text style={styles.title}>{this.props.songName}</Text>
        <Text style={styles.artist}>{this.props.songArtist}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    color: colors.light,
    fontWeight: '700'
  },
  artist: {
    color: colors.lightAlt
  }
})