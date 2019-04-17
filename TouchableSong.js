import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

const colors = {
  light: "#EDEFF3",
  lightAlt: "#6F8C8F",
  primary: "#464E5D",
  darkAlt: "#4995df",
  dark: "#161F1E"
}

export default class TouchableSong extends React.Component {

  showSong = (song, props) => {
    this.props.navigation.navigate('Song', { title: song.songName, artist: song.songArtist })
  }

  render(props) {
    return (
      <TouchableHighlight underlayColor={'lightGrey'} onPress={this.props.onPress}>
        <View style={styles.songButton}>
          <Text style={styles.songName}>{this.props.songName}</Text>
          <Text style={styles.songArtist}>  {this.props.songArtist}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  songName: {
    fontSize: 20,
    color: colors.light,
  },
  songArtist: {
    fontSize: 15,
    color: colors.darkAlt,
    paddingTop: 5,
  },
  songButton: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.primary,
    height: 45,
    marginBottom: 1,
    padding: 10,
    alignItems: 'center',
  }
})
