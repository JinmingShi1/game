import React, {useState, useEffect, useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Overlay } from 'react-native-elements';
import { queryPlayer, getHistory, addHistory } from '../../utils/api';
import { answers, dateFormatter } from '../../utils/utils';
import { Alert } from 'react-native';
import {AuthContext} from '../../context/AuthContext';

function Game(): JSX.Element {
  const [overlayVisible, setOverlayVisible] = useState(false);
  const [resultOverlayVisible, setResultOverlayVisible] = useState(false);
  const [historyOverlayVisible, setHistoryOverlayVisible] = useState(false);

  const [searchText, setSearchText] = useState('');
  const [score, setScore] = useState(0);
  const [shots, setShots] = useState(9);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [answerArray, setAnswerArray] = useState(['', '', '', '']); // ['Brandon Davidson', 'Casey Cizikas', 'Thomas Hickey', 'Thomas Greiss']
  const [rowTeamIndex, setRowTeamIndex] = useState(0);
  const [colTeamIndex, setColTeamIndex] = useState(2);
  const [gameFinished, setGameFinished] = useState(false);
  const [currentSelectedIndex, setCurrentSelectedIndex] = useState(0);
  const [result, setResult] = useState('');
  const { width } = Dimensions.get('window');
  
  const { logout } = useContext(AuthContext);

  const [historyList, setHistoryList] = useState([]);


  const getSearchPlayers = (searchText: string) => {
    queryPlayer(searchText).then(res => {
      setFilteredPlayers(res.data.data);
    })
  }

  const startSearching = function() {
    setSearchText('');
    setFilteredPlayers([]);
    setOverlayVisible(true);
  }

  const onSelect = function(yearsActive: any, playerName: string) {
    let rowTeamMatch = false, colTeamMatch = false;
    // compare has common team in one year
    Object.keys(yearsActive).forEach((key) => {
      if (!rowTeamMatch && key in answers[rowTeamIndex]) {
        const rowTeams = new Set(answers[rowTeamIndex][key]);
        const currentTeams = yearsActive[key];
        for (const team of currentTeams) {
          if (rowTeams.has(team)) {
            rowTeamMatch = true;
            break;
          }
        }
      }

      if (!colTeamMatch && key in answers[colTeamIndex]) {
        const colTeams = new Set(answers[colTeamIndex][key]);
        const currentTeams = yearsActive[key];
        for (const team of currentTeams) {
          if (colTeams.has(team)) {
            colTeamMatch = true;
            break;
          }
        }
      }
    });
    // answer is correct
    if (rowTeamMatch && colTeamMatch) {
      const arr = [...answerArray];
      arr[currentSelectedIndex] = playerName;
      setAnswerArray(arr);
      // all correct
      if (score === 3) {
        victory();
      }
      setScore(score + 1);
    } else {
      // failed
      if (shots === 1) {
        fail();
      } else {
        Alert.alert('Incorrect');
      }

    }
    setOverlayVisible(false);
    setShots(shots - 1);
  }

  const resetGame = () => {
    setScore(0);
    setShots(9);
    setAnswerArray(['', '', '', '']);
    setGameFinished(false);
  }

  const victory = () => {
    setGameFinished(true);
    setResult('You win!');
    setResultOverlayVisible(true);
    addHistory({score: 4});
  }

  const fail = () => {
    setGameFinished(true);
    setResult('You lose!');
    setResultOverlayVisible(true);
    addHistory({score});
  }

  const historyClick = () => {
    getHistory().then(res => {
      setHistoryList(res.data)
      setHistoryOverlayVisible(true)

    })
  }

  return (
    <SafeAreaView style={styles.backgroundStyle}>

      <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingTop: 20}}>
        <TouchableOpacity style={styles.button} onPress={() => logout()}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => resetGame()}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => historyClick()}>
          <Text style={styles.buttonText}>History</Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={styles.scoreContainer}>
          <Text style={{textAlign: 'left', flex: 1}}>
            Score: <Text style={{fontSize: 16, color: '#333', fontWeight: 'bold'}} >{score}/4</Text>
          </Text>
          <Text style={{textAlign: 'left', flex: 1}}>
            Shots left: <Text style={{fontSize: 16, color: '#333', fontWeight: 'bold'}} >{shots}</Text>
          </Text>
        </View>
        <View style={styles.gameContainer}>
        

        {/* line 1 */}
        <View style={styles.row}>
          <Text style={[styles.cell, styles.borderLeft]}></Text>
          <Text style={[styles.cell, styles.gray]}>Chris Wagner</Text>
          <Text style={[styles.cell, styles.gray]}>Ross Johnston</Text>
        </View>

        {/* line 2 */}
        <View style={styles.row}>

          <Text style={[styles.cell, styles.borderLeft, styles.gray]}>Shane Prince</Text>
          <TouchableOpacity style={styles.cell} onPress={() => {
            if (answerArray[0] !== '' || gameFinished) {
              return;
            }
            setRowTeamIndex(2);
            setColTeamIndex(0);
            setCurrentSelectedIndex(0);
            startSearching();
          }}>
            <Text style={styles.text}>{answerArray[0]}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cell} onPress={() => {
              if (answerArray[1] !== '' || gameFinished) {
                return;
              }
              setRowTeamIndex(2);
              setColTeamIndex(1);
              setCurrentSelectedIndex(1);
              startSearching()
          }}>
            <Text style={styles.text}>{answerArray[1]}</Text>
          </TouchableOpacity>
        </View>

        {/* line 3 */}
        <View style={styles.row}>
          <Text style={[styles.cell, styles.borderBottom, styles.gray, styles.borderLeft]}>Anders Lee</Text>
          <TouchableOpacity style={[styles.cell, styles.borderBottom]} onPress={() => {
              if (answerArray[2] !== '' || gameFinished) {
                return;
              }
              setRowTeamIndex(3);
              setColTeamIndex(0);
              setCurrentSelectedIndex(2);
              startSearching()
          }}>
            <Text style={[styles.text]}>{answerArray[2]}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.cell, styles.borderBottom]} onPress={() => {
              if (answerArray[3] !== '' || gameFinished) {
                return;
              }
              setRowTeamIndex(3);
              setColTeamIndex(1);
              setCurrentSelectedIndex(3);
              startSearching();
          }}>
            <Text style={[styles.text]}>{answerArray[3]}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
      
    
    
    <Overlay
      isVisible={overlayVisible} onBackdropPress={() => setOverlayVisible(false)}>
      <View style = {{width: width * 0.8, height: width * 0.8}}>
        <View style={{flexDirection: 'row', borderColor: '#ccc', marginBottom: 20, borderWidth: 1}}>
        <TextInput placeholder='Search for player...' 
          onChangeText={(v: string) => {
            setSearchText(v);
            getSearchPlayers(v);
          }}
          />
        </View>

        {/** players list */}
        <ScrollView style={{flex: 1, marginBottom: 10}}>
          {filteredPlayers && filteredPlayers.map(e => {return (

          <View key={e.id} style={{marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>
            {/** left */}
            <View style={{flexDirection: 'column'}}>
                <Text>{e.name}</Text>
                  <Text>{Object.keys(e.yearsActive).sort()[0].substring(0, 4)}-{e.yearsActive.length === 1 ? Object.keys(e.yearsActive)[0].substring(5) : Object.keys(e.yearsActive).sort()[Object.keys(e.yearsActive).length - 1].substring(5)}
                  </Text>
            </View>
            {/** button */}
            <TouchableOpacity onPress={() => {
              onSelect(e.yearsActive, e.name);
            }} style={{width: 90, backgroundColor: '#68C2FE',borderRadius: 10, justifyContent: 'center'}} >
              <Text  style={{ textAlign: 'center', fontWeight: '700',fontSize: 16, color: '#fff'}}>Select</Text>
            </TouchableOpacity>
          </View>

          )})}
        </ScrollView>
      </View>

    </Overlay>
      
    
    <Overlay isVisible={resultOverlayVisible} onBackdropPress={() => setResultOverlayVisible(false)}>
        <View style={{width: 200, height: 200}}>
          <Text>{result}</Text>
        </View>
    </Overlay>
    

    <Overlay isVisible={historyOverlayVisible} onBackdropPress={() => setHistoryOverlayVisible(false)}>
        <View style={{width: 200, height: 200}}>
        <View style={{borderBottomColor: '#666', 
          borderBottomWidth: 1, 
          paddingTop: 10,
          paddingBottom: 10, flexDirection: 'row', justifyContent:'space-between'}}>
            <Text>score</Text>
            <Text style={{paddingRight: 10}}>time</Text>
          </View>
          <ScrollView style={{flex: 1}}>
          {
            historyList.map((l, i) => (
              <View key={i} style={{borderBottomColor: '#666', 
              borderBottomWidth: 1, 
              paddingTop: 10,
              paddingBottom: 10, flexDirection: 'row', justifyContent:'space-between'}}>
                <Text>{l.score}</Text>
            <Text style={{paddingRight: 10}}>{l.time}</Text>
              </View>
            ))
          }
          </ScrollView>
        </View>
    </Overlay>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    // alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(233, 241, 242)',
  },
  button: {
    width: 100,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#A7C0CE',
    justifyContent: 'center',
    alignContent: 'center'
  },
  buttonText: {
    flex: 1,
    textAlignVertical: 'center',
    textAlign: 'center'
  },
  gray: {
    backgroundColor: '#A7C0CE'
  },
  scoreContainer: {
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  gameContainer: {
    height: '40%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  cell: {
    flex: 1,
    height: '100%',
    borderTopWidth: 1,
    borderRightWidth: 1,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  text: {
    textAlign: 'center',
    textAlignVertical: 'center',
    flex: 1
  },
  borderLeft: {
    borderLeftWidth: 1,
  },
  borderBottom: {
    borderBottomWidth: 1
  }
  
});

export default Game;
