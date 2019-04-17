import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
// import HTML from 'react-native-render-html'
import HTMLView from 'react-native-htmlview';

import Title from './Title.js'

const colors = {
  light: "#EDEFF3",
  lightAlt: "#6F8C8F",
  primary: "#464E5D",
  darkAlt: "#4995df",
  dark: "#161F1E"
}

export default class Song extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Title 
      songName={navigation.getParam('title', 'Song')} 
      songArtist={navigation.getParam('artist', 'Artist')}
      />,
      headerStyle: {
        backgroundColor: colors.dark
      },
      headerTintColor: colors.light
    };
  };

	constructor(props) {
		super(props)
		this.state = {
      song: props.navigation.getParam('title', "Song"),
      loaded: false,
			chordContent: ''
		}
  }

	componentWillMount() {
		db.collection('songs').doc(this.state.song).get().then((doc) => {
      let html
      let fixedHtml
    	if (doc.exists) {
        html = doc.data().webChords
        // insert invisible character to prevent whitespace from being collapsed
        fixedHtml = html.replace(/ </g, '&zwnj; <')
    		this.setState({
          loaded: true,
          chordContent: `<pre><wrap>${fixedHtml}<wrap></pre>`
    		})
    	}
		})
  }

	render() {
    if (this.state.loaded == true) {
      return (
        <ScrollView style={styles.viewContainer}>
          <HTMLView 
          value={this.state.chordContent}
          stylesheet={HTMLStyles}
          />
        </ScrollView>
      )
    } else {
        return (
          <View style={styles.loading}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )
    }
	}
}

const HTMLStyles = StyleSheet.create({
  pre: {
    padding: 5,
    backgroundColor: colors.dark,
  },
  chord: {
    fontWeight: '700',
    color: colors.darkAlt,
  },
  span: {
    color: colors.darkAlt
  },
  wrap: {
    color: colors.light,
  }
})

const styles = StyleSheet.create({
  viewContainer: {
    backgroundColor: colors.dark,
    color: 'white'
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.dark,
  },
  loadingText: {
    color: colors.light
  }
});