import React, { useEffect, useState } from "react"
import { DateTime, Settings } from 'luxon'

import Map from './map'
import Card from "./card";
import Box from "./box";
import Totals from './totals';
import Header from './header';
import Eody from './eody';

import "../assets/layout.css"
import GridView from '../assets/grid-view.png';
import MapView from '../assets/map-view.png';
import CloseX from '../assets/close-x.svg';

Settings.defaultLocale = "el";

const Layout = ({ children }) => {
  const [data, setData] = useState(null);
  const [openDay, setOpenDay] = useState(null);
  const [showDevBy, setDevBy] = useState(false);
  const [view, setView] = useState('grid');

  const [grid, setGrid] = useState({
    left: ['auto', 'auto'],
    right: ['max-content', 'auto', 'max-content', 'max-content']
  });

  useEffect(()=> {
    fetch('https://storage.googleapis.com/corona-map/data.json', {
      mode: 'cors',
      cache: 'force-cache'
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data) {
        setData(data);
      }
    });
  }, []);

  const toggleDay = (day) => {
    if (day === openDay) {
      setOpenDay(null);
    } else {
      setOpenDay(day);
    }
  };

  const toggleDevBy = (e) => {
    e.preventDefault();
    setDevBy(!showDevBy);
  }

  const toggleView = () => {
    setView(view === 'grid' ? 'map' : 'grid')
  }

  return (
    <>
    {children}
    <Header />
      <div className="main">
      {data ? (
        <>
        {/* Sidebar Left */}
        <div className="sidebar" style={{'gridTemplateRows': grid.left.join(' ')}}>
          <Totals data={data.totals} className="totals-mobile" />
          <Box title="COVID-19 | Ελλάδα" index={0} up={[grid, setGrid]}>
            <div className="box-list">
              {data.cases.filter(f=> f.location ).map((c, i) => (<div key={i.toString()+'_case'} className="box-list-item"><div>{c.location}</div><div>{c.count}</div></div>))}
            </div>
          </Box>
          <Box title="Έκτακτα μέτρα" index={1} up={[grid, setGrid]}>
            <div className="box-list">
            {data.suspension.map((s, i) => (<div key={i.toString()+'_susp'} className="box-list-item"><div>{s.name}</div><div>{DateTime.fromISO(s.date).toFormat('dd/MM')}</div></div>))}
            </div>
          </Box>
        </div>
        
        {/* Map */}
        <div className={'map' + (view === 'map'? ' map-open':'')}>
          <Map markers={data.cases} update={view} />
          <div className="map-filter">
            Κρούσματα
          </div>
          <div className="last-updated">Τελ. ενημέρωση {DateTime.fromISO(data.lastUpdated).toFormat('dd/MM/yy HH:mm')}</div>
        </div>

        {/* Sidebar Right */}
        <div className="sidebar" sidebar="right" style={{gridTemplateRows: grid.right.join(' '), overflow: 'auto'}}>
          <Totals data={data.totals} className="totals-web" />

          <Box title="Χρονικό" sidebar="right" toggable={false} classes="box-history">
            <div>
              {Object.keys(data.history).map(k => {
                return (
                <div key={k} className={'history-item' + (openDay === k ? ' open' : '')}>
                  <div className="history-head" onClick={() => toggleDay(k)} onKeyPress={() => toggleDay(k)} role="button" tabIndex="0">
                    <div className="history-title">{DateTime.fromFormat(k, 'd/M/yyyy').toFormat('cccc dd/MM')} <span>(+{Object.values(data.history[k]).reduce((a, c) => a + c)})</span>
                    </div>
                    <div className="collapse"></div>
                  </div>
                  <div className="history-content">
                    {Object.keys(data.history[k]).map(kb => (
                      <div key={kb}>{kb} - {data.history[k][kb]} {data.history[k][kb] > 1 ? 'κρούσματα' : 'κρούσμα'}</div>
                    ))}
                  </div>
                </div>
                );
              }
              )}
            </div>
          </Box>

          <Box title="Χρήσιμα links" classes="no-content-pad box-links" sidebar="right" index={1} open={false} up={[grid, setGrid]}>
            {data.links.map((t, i) => (
              <a href={t.url} target="_blank" rel="noopener noreferrer" title={t.name} key={i.toString()+'_link'} className="box-header box-header--link">
                <div>{t.name}</div><div className="box-header--actions">></div>
              </a>
            ))}
          </Box>

          <div>
            <Box classes="box-empty" sidebar="right">
              <Eody />
            </Box>
          </div>

        </div>

        {/* Mobile icons */}
        <div className="swtich-view" onClick={toggleView} onKeyPress={() => toggleView()} role="button" tabIndex="0">
          {view === 'grid' ? (<img src={MapView} alt="" />) : (<img src={GridView} alt="" />)}
        </div>

      </>
      ) : (
        <div>Δοκιμάστε ξανά αργότερα...</div>
      )}
      </div>

      {showDevBy && (
        <div className="bg fade-in">
          <div className="content">
            <Card>
            "Υλοποιήθηκε από την εταιρεία høly <a href="https://holy.gd/">https://holy.gd/</a> στο πλαίσιο της εταιρικής κοινωνικής ευθύνης σε συνεργασία με την <a href="https://eellak.ellak.gr">ΕΕΛΛΑΚ</a>, 
            ο κώδικάς της εφαρμογής είναι ελεύθερα διαθέσιμος στο <a href="https://github.com/eellak/coronamap">github</a>, με την άδεια <a href="https://joinup.ec.europa.eu/collection/eupl/eupl-text-eupl-12">European Union Public Licence (EUPL)</a>"
            <div className="close-x" onClick={toggleDevBy} onKeyPress={() => toggleDevBy()} role="button" tabIndex="0"><img src={CloseX} alt="Κλείσιμο"/></div>
            </Card>
          </div>
        </div>
      )}
      <footer>
        <div>© Copyright {new Date().getFullYear()} GOV.GR</div>
        <div>Υλοποίηση με χρήση <button className="btn btn-link" onClick={toggleDevBy}>Ανοικτού Λογισμικού</button> - Άδεια χρήσης περιεχομένου <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.el">CC-BY-SA</a>.</div>
      </footer>
    </>
  )
}

export default Layout
