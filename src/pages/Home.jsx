import React from 'react'
import HeroSection from '../components/home/HeroSection'
import LiveStream from '../components/livestream/LiveStream'
import UpcomingEvents from '../components/home/UpcomingEvents'
import MissionStatement from '../components/home/MissionStatement'
import Testimonials from '../components/home/Testimonials'
import LatestSermons from '../components/home/LatestSermons'
import PrayerRequests from './PrayerRequest'
import LeadershipTeam from '../components/about/LeadershipTeam'





const Home = () => {
  return (
    <div>
        <HeroSection />
        <UpcomingEvents />
        <LeadershipTeam />
        <LiveStream />
        <LatestSermons />
        <Testimonials />
        <MissionStatement />
        <PrayerRequests />
    </div>
  )
}

export default Home