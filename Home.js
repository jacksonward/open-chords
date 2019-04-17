import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';

import TouchableSong from './TouchableSong.js'

const colors = {
  light: "#EDEFF3",
  lightAlt: "#6F8C8F",
  primary: "#464E5D",
  darkAlt: "#4995df",
  dark: "#161F1E"
}

export default class App extends React.Component {

  static navigationOptions = {
    title: 'Songs',
    headerStyle: {
      backgroundColor: colors.dark
    },
    headerTintColor: colors.light,
    headerTitleStyle: {
      fontSize: 25,
    },
  };

  constructor(props) {
    super(props)
    this.state = {
      // Declare songList array to contain song ids
      songList: []
    }

    this.getSongList = this.getSongList.bind(this)
    this.showSong = this.showSong.bind(this)
    this.getSongList()
  }

  getSongList() {
    db.collection('songs').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let songList = this.state.songList
        songList.push({
          songName: doc.id,
          songArtist: doc.data().artist,
        })

        this.setState({
          songList: songList
        })
      })
    })
  }

  showSong = (song, props) => {
    this.props.navigation.navigate('Song', {title: song.songName, artist: song.songArtist})
  }

  render() {
    return (
      <ScrollView style={styles.viewContainer}>
        {
          // NOTE 'song' is an *object* in state
          this.state.songList.map(song => {
            // return (<TouchableHighlight onPress={() => this.showSong(song)} key={song.songName}><Text>{song.songName}</Text></TouchableHighlight>)
            return (<TouchableSong onPress={() => this.showSong(song)} key={song.songName} songName={song.songName}/>)
          })
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: colors.lightAlt,
  },
})
