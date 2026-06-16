import { useState } from 'react'
import Cursor from './components/Cursor'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BuildScroll from './components/BuildScroll'
import CompSection from './components/CompSection'
import Showcase from './components/Showcase'
import Specs from './components/Specs'
import Features from './components/Features'
import Reveal from './components/Reveal'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  const [ready, setReady] = useState(false)

  return (
    <>
      <Cursor />
      <Loader onDone={() => setReady(true)} />
      <Navbar ready={ready} />
      <Hero ready={ready} />
      <BuildScroll />

      <CompSection
        id="chassis"
        tag="Architecture · 01"
        title={"The Carbon\nSkeleton"}
        body="The monocoque isn't just a chassis — it is the machine's soul. Constructed from pre-preg carbon fibre, autoclave-cured at 120°C under 6 bar of pressure. The safest, stiffest, lightest structure in motorsport. Every championship begins here, in this raw black form."
        img="/frame.png"
        imgSide="left"
        stats={[
          { val: '43kg', label: 'Chassis Weight' },
          { val: '7.5km', label: 'Carbon Fibre' },
          { val: '0.1mm', label: 'Tolerance' },
        ]}
      />

      <CompSection
        id="power"
        tag="Power Unit · 02"
        title={"Ferrari\n066/12"}
        body="The beating heart. A 1.6-litre turbocharged V6 paired with MGU-K and MGU-H — two motor-generator units harvesting and deploying electrical energy across every lap. Over 1,000 combined horsepower in a package weighing less than 150 kg. Italian thunder, precisely contained."
        img="/engine.png"
        imgSide="right"
        accent
        stats={[
          { val: '1000+', label: 'Combined HP' },
          { val: '18k', label: 'Max RPM' },
          { val: '1.6L', label: 'V6 Turbo' },
        ]}
      />

      <Showcase />
      <Specs />
      <Features />
      <Reveal />
      <CTA />
      <Footer />
    </>
  )
}
