import {createStackNavigator} from '@react-navigation/stack';

import Storiesandlghstravlload from '../Storiesandlghstravlcpn/Storiesandlghstravlload';
import Storiesandlghstravtabs from '../../Storiesandlghstravtabs';

import Storiesandlghstravlonb from '../Storiesandlghstravlscrns/Storiesandlghstravlonb';

const Stack = createStackNavigator();

const Storiesandlghstrvstack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Storiesandlghstravlload"
        component={Storiesandlghstravlload}
      />
      <Stack.Screen
        name="Storiesandlghstravlonb"
        component={Storiesandlghstravlonb}
      />
      <Stack.Screen
        name="Storiesandlghstravtabs"
        component={Storiesandlghstravtabs}
      />
    </Stack.Navigator>
  );
};

export default Storiesandlghstrvstack;
