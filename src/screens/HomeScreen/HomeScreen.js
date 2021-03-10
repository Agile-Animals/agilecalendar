import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, Alert } from "react-native";
import moment from "moment";
import {
  Icon,
  Layout,
  Button,
  List,
  Card,
  Calendar,
} from "@ui-kitten/components";
import { useForm, Controller } from "react-hook-form";
import firebase from "../../database/firebaseDb";
import { loggingOut } from "../../API/firebaseMethods";
import { DraxProvider, DraxView } from 'react-native-drax';

// these need to be updated upon fliping or they serve no real purpose
// const window = Dimensions.get("window");
// const screen = Dimensions.get("screen");

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [insatser, setInsatser] = useState([]); // Initial empty array of users
  const [date, setDate] = useState(new Date());

  const insatsRef = firebase.firestore().collection("insatser");
  const userID = firebase.auth().currentUser.uid;

  const [received, setReceived] = React.useState([]);
  const [staged, setStaged] = React.useState([]);


  useEffect(() => {
    const subscriber = insatsRef
      .where("boende", "==", userID)
      .onSnapshot((querySnapshot) => {
        const tempInsatser = [];

        querySnapshot.forEach((documentSnapshot) => {
          tempInsatser.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });

        setInsatser(tempInsatser);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  const handlePress = () => {
    loggingOut();
    navigation.replace("Login");
  };

  let today = new Date();
  today = moment(today).format("YYYY-MM-DD");
  let tomorrow = new Date();
  let aday2 = moment(tomorrow).add(1, "day").format("YYYY-MM-DD");
  let aday3 = moment(tomorrow).add(2, "day").format("YYYY-MM-DD");
  let aday4 = moment(tomorrow).add(3, "day").format("YYYY-MM-DD");
  let aday5 = moment(tomorrow).add(4, "day").format("YYYY-MM-DD");
  let aday6 = moment(tomorrow).add(5, "day").format("YYYY-MM-DD");
  let aday7 = moment(tomorrow).add(6, "day").format("YYYY-MM-DD");

  const day1 = ({ item, index }) =>
    item.date === today ? (
      <Card
        style={styles.instatsList}
        onPress={() => {
          navigation.navigate("InsatsDetailScreen", {
            insatskey: item.key,
          });
        }}
      >
        <Text>
          {item.fromTime}-{item.toTime} {"\n\n"}
          {item.insatsType}
        </Text>
      </Card>
    ) : null;

  const day2 = ({ item, index }) =>
    item.date === aday2 ? (
      <Card
        style={styles.instatsList}
        onPress={() => {
          navigation.navigate("InsatsDetailScreen", {
            insatskey: item.key,
          });
        }}
      >
        <Text>
          {item.fromTime}-{item.toTime} {"\n\n"}
          {item.insatsType}
        </Text>
      </Card>
    ) : null;

  const day3 = ({ item, index }) =>
    item.date === aday3 ? (
      <Card
        style={styles.instatsList}
        onPress={() => {
          navigation.navigate("InsatsDetailScreen", {
            insatskey: item.key,
          });
        }}
      >
        <Text>
          {item.fromTime}-{item.toTime} {"\n\n"}
          {item.insatsType}
        </Text>
      </Card>
    ) : null;

  const day4 = ({ item, index }) =>
    item.date === aday4 ? (
      <Card
        style={styles.instatsList}
        onPress={() => {
          navigation.navigate("InsatsDetailScreen", {
            insatskey: item.key,
          });
        }}
      >
        <Text>
          {item.fromTime}-{item.toTime} {"\n\n"}
          {item.insatsType}
        </Text>
      </Card>
    ) : null;

  const day5 = ({ item, index }) =>
    item.date === aday5 ? (
      <Card
        style={styles.instatsList}
        onPress={() => {
          navigation.navigate("InsatsDetailScreen", {
            insatskey: item.key,
          });
        }}
      >
        <Text>
          {item.fromTime}-{item.toTime} {"\n\n"}
          {item.insatsType}
        </Text>
      </Card>
    ) : null;

  const day6 = ({ item, index }) =>
    item.date === aday6 ? (
      <Card
        style={styles.instatsList}
        onPress={() => {
          navigation.navigate("InsatsDetailScreen", {
            insatskey: item.key,
          });
        }}
      >
        <Text>
          {item.fromTime}-{item.toTime} {"\n\n"}
          {item.insatsType}
        </Text>
      </Card>
    ) : null;

  const day7 = ({ item, index }) =>
    item.date === aday7 ? (
      <Card
        style={styles.instatsList}
        onPress={() => {
          navigation.navigate("InsatsDetailScreen", {
            insatskey: item.key,
          });
        }}
      >
        <Text>
          {item.fromTime}-{item.toTime} {"\n\n"}
          {item.insatsType}
        </Text>
      </Card>
    ) : null;

  return (
    <Layout style={styles.container} level="1">
      <Layout style={styles.header} level="1">
        <Text category="h2">Översikt user: {userID}</Text>
        {/* <Text category="h6">Valt Datum: {date.toLocaleDateString()}</Text> */}
      </Layout>
      <Layout style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          style={{ height: 40, width: 140 }}
          onPress={() => {
            navigation.navigate("AddInsatsScreen");
          }}
        >
          Lägg till insats
        </Button>
      </Layout>
      {/* <Layout style={styles.listContainer}>


      </Layout>
 */}


      <DraxProvider>
        <View style={styles.container}>
          <View style={styles.listContainer}>
            <DraxView 

              style={[styles.centeredContent, styles.receivingZone, styles.magenta]}
              style={{ height: 40, width: 140 }}
              // receivingStyle={styles.receiving}
              renderContent={({ viewState }) => {
                const receivingDrag = viewState && viewState.receivingDrag;
                const payload = receivingDrag && receivingDrag.payload;
                return (
                  <>
                    <Text> Måndag: {today}</Text>
                    <List data={insatser} renderItem={day1} />

                    <Text style={styles.incomingPayload}>{payload || '-'}</Text>
                    <Text style={styles.received}>{received.join(' ')}</Text>
                  </>
                );
              }}
              onReceiveDragDrop={(event) => {
                setReceived([
                  ...received,
                  event.dragged.payload || '?',
                ]);
              }}
            />

            <DraxView style={{ width: 180 }}

              style={[styles.centeredContent, styles.receivingZone, styles.magenta]}
              style={{ height: 40, width: 140 }}
              // receivingStyle={styles.receiving}
              renderContent={({ viewState }) => {
                const receivingDrag = viewState && viewState.receivingDrag;
                const payload = receivingDrag && receivingDrag.payload;
                return (
                  <>
                    <Text> Tisdag: {moment(tomorrow).add(1, "day").format("MM-DD")}</Text>
                    <List data={insatser} renderItem={day2} />

                    <Text style={styles.incomingPayload}>{payload || '-'}</Text>
                    <Text style={styles.received}>{received.join(' ')}</Text>
                  </>
                );
              }}
              onReceiveDragDrop={(event) => {
                setReceived([
                  ...received,
                  event.dragged.payload || '?',
                ]);
              }}
            />



            <DraxView style={{ width: 180 }}

              style={[styles.centeredContent, styles.receivingZone, styles.magenta]}
              style={{ height: 40, width: 140 }}
              // receivingStyle={styles.receiving}
              renderContent={({ viewState }) => {
                const receivingDrag = viewState && viewState.receivingDrag;
                const payload = receivingDrag && receivingDrag.payload;
                return (
                  <>
                    <Text> Onsdag: {moment(tomorrow).add(2, "day").format("MM-DD")}</Text>
                    <List data={insatser} renderItem={day3} />

                    <Text style={styles.incomingPayload}>{payload || '-'}</Text>
                    <Text style={styles.received}>{received.join(' ')}</Text>
                  </>
                );
              }}
              onReceiveDragDrop={(event) => {
                setReceived([
                  ...received,
                  event.dragged.payload || '?',
                ]);
              }}
            />

            <DraxView style={{ width: 180 }}

              style={[styles.centeredContent, styles.receivingZone, styles.magenta]}
              style={{ height: 40, width: 140 }}
              // receivingStyle={styles.receiving}
              renderContent={({ viewState }) => {
                const receivingDrag = viewState && viewState.receivingDrag;
                const payload = receivingDrag && receivingDrag.payload;
                return (
                  <>
                    <Text>
                      {" "}
            Torsdag: {moment(tomorrow).add(3, "day").format("MM-DD")}
                    </Text>
                    <List data={insatser} renderItem={day4} />
                    <Text style={styles.incomingPayload}>{payload || '-'}</Text>
                    <Text style={styles.received}>{received.join(' ')}</Text>
                  </>
                );
              }}
              onReceiveDragDrop={(event) => {
                setReceived([
                  ...received,
                  event.dragged.payload || '?',
                ]);
              }}
            />

            <DraxView style={{ width: 180 }}

              style={[styles.centeredContent, styles.receivingZone, styles.magenta]}
              style={{ height: 40, width: 140 }}
              // receivingStyle={styles.receiving}
              renderContent={({ viewState }) => {
                const receivingDrag = viewState && viewState.receivingDrag;
                const payload = receivingDrag && receivingDrag.payload;
                return (
                  <>
                    <Text> Fredag: {moment(tomorrow).add(4, "day").format("MM-DD")}</Text>
                    <List data={insatser} renderItem={day5} />

                    <Text style={styles.incomingPayload}>{payload || '-'}</Text>
                    <Text style={styles.received}>{received.join(' ')}</Text>
                  </>
                );
              }}
              onReceiveDragDrop={(event) => {
                setReceived([
                  ...received,
                  event.dragged.payload || '?',
                ]);
              }}
            />

            <DraxView style={{ width: 180 }}

              style={[styles.centeredContent, styles.receivingZone, styles.magenta]}
              style={{ height: 40, width: 140 }}
              // receivingStyle={styles.receiving}
              renderContent={({ viewState }) => {
                const receivingDrag = viewState && viewState.receivingDrag;
                const payload = receivingDrag && receivingDrag.payload;
                return (
                  <>
                    <Text> Lördag: {moment(tomorrow).add(5, "day").format("MM-DD")}</Text>
                    <List data={insatser} renderItem={day6} />

                    <Text style={styles.incomingPayload}>{payload || '-'}</Text>
                    <Text style={styles.received}>{received.join(' ')}</Text>
                  </>
                );
              }}
              onReceiveDragDrop={(event) => {
                setReceived([
                  ...received,
                  event.dragged.payload || '?',
                ]);
              }}
            />

            <DraxView style={{ width: 180 }}

              style={[styles.centeredContent, styles.receivingZone, styles.magenta]}
              style={{ height: 40, width: 140 }}
              // receivingStyle={styles.receiving}
              renderContent={({ viewState }) => {
                const receivingDrag = viewState && viewState.receivingDrag;
                const payload = receivingDrag && receivingDrag.payload;
                return (
                  <>
                    <Text> Söndag: {moment(tomorrow).add(6, "day").format("MM-DD")}</Text>
                    <List data={insatser} renderItem={day7} />

                    <Text style={styles.incomingPayload}>{payload || '-'}</Text>
                    <Text style={styles.received}>{received.join(' ')}</Text>
                  </>
                );
              }}
              onReceiveDragDrop={(event) => {
                setReceived([
                  ...received,
                  event.dragged.payload || '?',
                ]);
              }}
            />
          </View>

          <View style={styles.palette}>
            <DraxView
              style={[styles.centeredContent, styles.draggableBox, styles.red]}
              draggingStyle={styles.dragging}
              dragReleasedStyle={styles.dragging}
              hoverDraggingStyle={styles.hoverDragging}
              dragPayload={'Tvätta'}
              longPressDelay={0}
            >
              <Text>Tvätta</Text>
            </DraxView>
            <DraxView
              style={[styles.centeredContent, styles.draggableBox, styles.green]}
              draggingStyle={styles.dragging}
              dragReleasedStyle={styles.dragging}
              hoverDraggingStyle={styles.hoverDragging}
              dragPayload={'Duscha'}
              longPressDelay={0}
            >
              <Text>Duscha</Text>
            </DraxView>
            <DraxView
              style={[styles.centeredContent, styles.draggableBox, styles.blue]}
              draggingStyle={styles.dragging}
              dragReleasedStyle={styles.dragging}
              hoverDraggingStyle={styles.hoverDragging}
              dragPayload={'Handla'}
              longPressDelay={0}
            >
              <Text>Handla</Text>
            </DraxView>
            <DraxView
              style={[styles.centeredContent, styles.draggableBox, styles.yellow]}
              draggingStyle={styles.dragging}
              dragReleasedStyle={styles.dragging}
              hoverDraggingStyle={styles.hoverDragging}
              dragPayload={'Städa'}
              longPressDelay={0}
            >
              <Text>Städa</Text>
            </DraxView>
          </View>

        </View>
      </DraxProvider>



      <Button style={{ height: 40, width: 140 }} onPress={handlePress}>
        Logga Ut
      </Button>
    </Layout>






  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    // width: window.width * 1,
    // height: window.width * 1,
  },
  header: {
    alignItems: "center",
    padding: 20,
    paddingTop: 30,
  },
  listContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    margin: 10,
    borderRadius: 10,
    borderColor: "black",
    shadowColor: "black",
    shadowColor: "red",
    // width: 500,
  },
  item: {
    backgroundColor: "red",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  instatsList: {
    height: 100,
    flex: 10,
    color: "red",
    // shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  container: {
    flex: 1,
    padding: 12,
    paddingTop: 40,
    justifyContent: 'space-evenly',
  },
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  receivingZone: {
    height: 200,
    borderRadius: 10,
  },
  receiving: {
    borderColor: 'red',
    borderWidth: 2,
  },
  incomingPayload: {
    marginTop: 10,
    fontSize: 24,
  },
  received: {
    marginTop: 10,
    fontSize: 18,
  },
  palette: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  draggableBox: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  green: {
    backgroundColor: '#aaffaa',
  },
  blue: {
    backgroundColor: '#aaaaff',
  },
  red: {
    backgroundColor: '#ffaaaa',
  },
  yellow: {
    backgroundColor: '#ffffaa',
  },
  cyan: {
    backgroundColor: '#aaffff',
  },
  magenta: {
    height: 40,
    width: 140
  },
  dragging: {
    opacity: 0.2,
  },
  hoverDragging: {
    borderColor: 'magenta',
    borderWidth: 2,
  },
  stagedCount: {
    fontSize: 18,
  },
});

export default HomeScreen;