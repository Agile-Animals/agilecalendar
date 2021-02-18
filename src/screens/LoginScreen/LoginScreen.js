import React from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
// import Button from '../../components/Button'
import {Text, Layout, Button} from '@ui-kitten/components';
import {useForm, Controller} from 'react-hook-form';

const LoginScreen = ({navigation}) => {
  const {control, handleSubmit, errors} = useForm();
  const onSubmit = (data) => {
    if (data.email === 'test' && data.password === 'test') {
      console.log('success');
      navigation.navigate('Home');
    }
  };
  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>Logga in</Text>
        </View>
        <View>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="E-postadress"
              />
            )}
            name="email"
            rules={{required: true}}
            defaultValue=""
          />
          {errors.email && alert('field is required')}
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="Lösenord"
              />
            )}
            name="password"
            rules={{required: true}}
            defaultValue=""
          />
          {errors.password && <Text>This is required.</Text>}
        </View>
        <Button onPress={handleSubmit(onSubmit)}> Login </Button>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  heading: {
    fontSize: 28,
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
  },
  text: {
    margin: 2,
  },
  header: {
    alignItems: 'center',
  },
});

export default LoginScreen;
