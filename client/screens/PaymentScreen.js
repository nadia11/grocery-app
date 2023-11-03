import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert, Image, TouchableOpacity} from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../slices/basketSlice';
import { selectResturant } from '../slices/resturantSlice';
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
//ADD localhost address of your server
const API_URL = "https://express-common1.onrender.com";

export default function PaymentScreen(props) {
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();
    const resturant = useSelector(selectResturant); 
    const [groupedItems, setGroupedItems] = useState([])
    const basketItems = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal);
    const [paymentSuccess, setPaymentSuccess]= useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const deliveryFee = 2;
    useMemo(() => {
        const gItems = basketItems.reduce((group, item)=>{
            if(group[item.id]){
              group[item.id].push(item);
            }else{
              group[item.id] = [item];
            }
            return group;
          },{})
        setGroupedItems(gItems);
        // console.log('items: ',gItems);

    }, [basketItems])

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/api/v1/checkout/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "Amount":basketTotal+deliveryFee,
      })
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete || !email) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }
    const billingDetails = {
      email: email,
    };
    //2.Fetch the intent client secret from the backend
    try {

      const paymentData = await fetchPaymentIntentClientSecret();
      const { clientSecret, error } = paymentData;
      console.log(paymentData);
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          paymentMethodType: "Card",
          billingDetails: billingDetails,
        });
        if (error) {

          console.log(error.stack || error);
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          alert("Payment Successful for tk" + basketTotal+deliveryFee);
          setPaymentSuccess(true);
        }
      }
    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with the card details
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logoCard.png')} style={{height:50, width:'100%', paddingHorizontal:40, marginBottom:30,resizeMode:'contain'}}></Image>
      <View style={{padding:25, borderWidth:1, marginHorizontal:20, borderColor:'#166332', borderRadius:10}}>
      <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
        onChange={value => setEmail(value.nativeEvent.text)}
        style={styles.input}
      />
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={cardDetails => {
          setCardDetails(cardDetails);
        }}
      />
      <Button onPress={handlePayPress} title="Pay" disabled={loading} color={"#166332"}/>
      </View>
           <View style={{backgroundColor: themeColors.bgColor(0.2)}} className="p-6 px-8 rounded-t-3xl space-y-4 mt-40">
            <View className="flex-row justify-between">
                <Text className="text-white">Subtotal</Text>
                <Text className="text-white">${basketTotal}</Text>
            </View>
            <View className="flex-row justify-between">
                <Text className="text-white">Delivery Fee</Text>
                <Text className="text-white">${deliveryFee}</Text>
            </View>
            <View className="flex-row justify-between">
                <Text className="font-extrabold text-white">Order Total</Text>
                <Text className="font-extrabold" style={{color: themeColors.text}}>${basketTotal+deliveryFee}</Text>
            </View>
            {paymentSuccess &&  <View>
                <TouchableOpacity
                style={{backgroundColor: themeColors.text}}
                onPress={()=> navigation.navigate('PreparingOrder')}
                className="p-3 rounded-full">
                    <Text className="text-white text-center font-bold text-lg">Place Order</Text>
                </TouchableOpacity>
            </View>}
       </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    backgroundColor: "#efefefef",
    borderRadius: 8,
    borderColor:"#166332",
    fontSize: 15,
    height: 40,
    padding: 10,
    borderWidth:1
  },
  card: {
    backgroundColor: "#efefefef",
    borderRadius:10,
     borderColor:"#166332",
       borderWidth:1,
  },
  cardContainer: {
    height: 40,
    marginTop: 15,
    marginBottom:40,
     borderWidth:1,
      borderRadius:10,
     borderColor:"#166332",
  },
});