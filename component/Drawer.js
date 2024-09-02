import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
const Drawer = createDrawerNavigator();
export default function Drawer() {
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Home" component={Drawer1} />
                <Drawer.Screen name="Notifications" component={NotificationsScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}
function Drawer1({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button
                onPress={() => navigation.navigate('Notifications')}
                title="Go to notifications"
            />
            <Button
                onPress={() => navigation.openDrawer()}
                title="Open drawer"
            />
            <Button
                onPress={() => navigation.closeDrawer()}
                title="Close drawer"
            />
            <Button
                onPress={() => navigation.toggleDrawer()}
                title="Toggle drawer"
            />
        </View>
    );
}