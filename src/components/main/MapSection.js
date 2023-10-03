import {Map, YMaps} from "@pbe/react-yandex-maps";
import {useState,useMemo} from "react";

export default function MapSection({city,country}){
    /*
    если донно разрешение на геолокацию то отобразит найденный город если нет то Москву.
    * */

    let [geolocation,setGeoLocation] = useState([])
    let [isGetLocation,setIsGetLocation]=useState()
    let location =useMemo(()=>{
        navigator.geolocation.getCurrentPosition((position)=>{
            setGeoLocation([position.coords.latitude, position.coords.longitude])
            setIsGetLocation(true)
    }) 
    },[])

    return    <section className="sections">
        <YMaps>
            { isGetLocation &&  <Map id={'map'}
                              height={'100vh'}
                              width = {'100%'}
                              defaultState={{ center: geolocation, zoom: 9 }} />}
            {!isGetLocation &&  <Map id={'map'}
                                     height={'100vh'}
                                     width = {'100%'}
                                     defaultState={{ center:  [55.75, 37.57], zoom: 9 }} />}
        </YMaps>
        <p className="button-not-background map__button">
            карта как добраться
        </p>
    </section>
}