import Image from "next/image";
import styles from "./page.module.css";
import '../assets/Instrument_Sans/static/InstrumentSans-Bold.ttf'; 
import '../assets/Instrument_Sans/static/InstrumentSans-Regular.ttf';
import LinkZone from "./zones/linkZone";

export default function Home() {
  return (
    <div>
      <LinkZone/>
    </div>
  );
}
