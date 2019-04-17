import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, RefreshControl } from 'react-native';

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
    db.collection('info').get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let songList = this.state.songList
        if (!(songList.some(song => song.songName == doc.id))) {
          songList.push({
            songName: doc.id,
            songArtist: doc.data().artist,
          })
        }

        this.setState({
          songList: songList
        })
      })
    })
  }

  showSong = (song, props) => {
    this.props.navigation.navigate('Song', {title: song.songName, artist: song.songArtist})
  }

  onRefresh = () => {
    this.setState({
      refreshing: true
    })
    this.getSongList()
    this.setState({
      refreshing: false
    })
  }

  render() {
    if (this.state.songList.length > 0) {
      return (
        <ScrollView style={styles.viewContainer}
        refreshControl={
          <RefreshControl 
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        }
        >
          {
            // NOTE 'song' is an *object* in state
            this.state.songList.map(song => {
              return (<TouchableSong onPress={() => this.showSong(song)} 
              key={song.songName} 
              songName={song.songName}
              songArtist={song.songArtist}
              />)
            })
          }
        </ScrollView>
      );
    } else {
      return (
        <View style={styles.loading}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )
    }
    
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: colors.lightAlt,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightAlt,
  },
  loadingText: {
    color: colors.dark
  }
})