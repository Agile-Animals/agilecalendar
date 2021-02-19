import * as React from "react";
import { Layout, Text, Card, Button } from "@ui-kitten/components";

const HomeScreen = () => {
  return (
    <Layout style={styles.container}>
      <Text style={styles.heading} category="h2">
        Översikt
      </Text>
      <Card style={styles.card}>
        <Text>
          08:00-08:30
        </Text>
        <Text category="h4">
          Insats 1
        </Text>
      </Card>
      <Card style={styles.card}>
        <Text>
          08:00-08:30
        </Text>
        <Text category="h4">
          Insats 2
        </Text>
      </Card>
      <Card style={styles.card}>
        <Text>
          09:00-09:30
        </Text>
        <Text category="h4">
          Insats 3
        </Text>
      </Card>
      <Button>Boka ny insats</Button>
    </Layout>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 12,
  },
  heading: {
    marginLeft: 24,
    marginTop: 24,
  },
  card: {
    margin: 8,
  }
};

export default HomeScreen;
