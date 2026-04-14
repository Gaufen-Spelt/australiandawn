(function() {
  var game;
  var ui;

  var DateOptions = {hour: 'numeric',
                 minute: 'numeric',
                 second: 'numeric',
                 year: 'numeric',
                 month: 'short',
                 day: 'numeric' };

  var main = function(dendryUI) {
    ui = dendryUI;
    game = ui.game;

    // Add your custom code here.
  };

  var TITLE = "Social Democracy: An Alternate History" + '_' + "Autumn Chen";

  // the url is a link to game.json
  // test url: https://aucchen.github.io/social_democracy_mods/v0.1.json
  // TODO; 
  window.loadMod = function(url) {
      ui.loadGame(url);
  };

  window.showCredits = function() {
    if (window.dendryUI.dendryEngine.state.sceneId.startsWith('credits')) {
        window.dendryUI.dendryEngine.goToScene('backSpecialScene');
    } else {
        window.dendryUI.dendryEngine.goToScene('credits');
    }
  };

  window.showStats = function() {
    if (window.dendryUI.dendryEngine.state.sceneId.startsWith('library')) {
        window.dendryUI.dendryEngine.goToScene('backSpecialScene');
    } else {
        window.dendryUI.dendryEngine.goToScene('library');
    }
  };

  window.showMods = function() {
    window.hideOptions();
    if (window.dendryUI.dendryEngine.state.sceneId.startsWith('mod_loader')) {
        window.dendryUI.dendryEngine.goToScene('backSpecialScene');
    } else {
        window.dendryUI.dendryEngine.goToScene('mod_loader');
    }
  };
  
  window.showOptions = function() {
      var save_element = document.getElementById('options');
      window.populateOptions();
      save_element.style.display = "block";
      if (!save_element.onclick) {
          save_element.onclick = function(evt) {
              var target = evt.target;
              var save_element = document.getElementById('options');
              if (target == save_element) {
                  window.hideOptions();
              }
          };
      }
  };

  window.hideOptions = function() {
      var save_element = document.getElementById('options');
      save_element.style.display = "none";
  };

  window.disableBg = function() {
      window.dendryUI.disable_bg = true;
      document.body.style.backgroundImage = 'none';
      window.dendryUI.saveSettings();
  };

  window.enableBg = function() {
      window.dendryUI.disable_bg = false;
      window.dendryUI.setBg(window.dendryUI.dendryEngine.state.bg);
      window.dendryUI.saveSettings();
  };

  window.disableAnimate = function() {
      window.dendryUI.animate = false;
      window.dendryUI.saveSettings();
  };

  window.enableAnimate = function() {
      window.dendryUI.animate = true;
      window.dendryUI.saveSettings();
  };

  window.disableAnimateBg = function() {
      window.dendryUI.animate_bg = false;
      window.dendryUI.saveSettings();
  };

  window.enableAnimateBg = function() {
      window.dendryUI.animate_bg = true;
      window.dendryUI.saveSettings();
  };

  window.disableAudio = function() {
      window.dendryUI.toggle_audio(false);
      window.dendryUI.saveSettings();
  };

  window.enableAudio = function() {
      window.dendryUI.toggle_audio(true);
      window.dendryUI.saveSettings();
  };

  window.enableImages = function() {
      window.dendryUI.show_portraits = true;
      window.dendryUI.saveSettings();
  };

  window.disableImages = function() {
      window.dendryUI.show_portraits = false;
      window.dendryUI.saveSettings();
  };

  window.enableLightMode = function() {
      window.dendryUI.dark_mode = false;
      document.body.classList.remove('dark-mode');
      window.dendryUI.saveSettings();
  };
  window.enableDarkMode = function() {
      window.dendryUI.dark_mode = true;
      document.body.classList.add('dark-mode');
      window.dendryUI.saveSettings();
  };

  // populates the checkboxes in the options view
  window.populateOptions = function() {
    var disable_bg = window.dendryUI.disable_bg;
    var animate = window.dendryUI.animate;
    var disable_audio = window.dendryUI.disable_audio;
    var show_portraits = window.dendryUI.show_portraits;
    if (disable_bg) {
        $('#backgrounds_no')[0].checked = true;
    } else {
        $('#backgrounds_yes')[0].checked = true;
    }
    if (animate) {
        $('#animate_yes')[0].checked = true;
    } else {
        $('#animate_no')[0].checked = true;
    }
    if (disable_audio) {
        $('#audio_no')[0].checked = true;
    } else {
        $('#audio_yes')[0].checked = true;
    }
    if (show_portraits) {
        $('#images_yes')[0].checked = true;
    } else {
        $('#images_no')[0].checked = true;
    }
    if (window.dendryUI.dark_mode) {
        $('#dark_mode')[0].checked = true;
    } else {
        $('#light_mode')[0].checked = true;
    }
    if (window.dendryUI.typewriter) {
    $('#typewriter_yes')[0].checked = true;
    } else {
    $('#typewriter_no')[0].checked = true;
    }
  };

  
  

  // This function allows you to do something in response to signals.
  window.handleSignal = function(signal, event, scene_id) {
  };
  
  // This function runs on a new page. Right now, this auto-saves.
  window.onNewPage = function() {
    var scene = window.dendryUI.dendryEngine.state.sceneId;
    if (scene != 'root' && !window.justLoaded) {
        window.dendryUI.autosave();
    }
    if (window.justLoaded) {
        window.justLoaded = false;
    }
  };

  // TODO: have some code for tabbed sidebar browsing.
  window.updateSidebar = function() {
      $('#qualities').empty();
      var scene = dendryUI.game.scenes[window.statusTab];
      dendryUI.dendryEngine._runActions(scene.onArrival);
      var displayContent = dendryUI.dendryEngine._makeDisplayContent(scene.content, true);
      $('#qualities').append(dendryUI.contentToHTML.convert(displayContent));
  };

  window.changeTab = function(newTab, tabId) {
      if (tabId == 'poll_tab' && dendryUI.dendryEngine.state.qualities.historical_mode) {
          window.alert('Polls are not available in historical mode.');
          return;
      }
      var tabButton = document.getElementById(tabId);
      var tabButtons = document.getElementsByClassName('tab_button');
      for (i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(' active', '');
      }
      tabButton.className += ' active';
      window.statusTab = newTab;
      window.updateSidebar();
  };

  window.onDisplayContent = function() {
      window.updateSidebar();
  };

  /*
   * This function copied from the code for Infinite Space Battle Simulator
   *
   * quality - a number between max and min
   * qualityName - the name of the quality
   * max and min - numbers
   * colors - if true/1, will use some color scheme - green to yellow to red for high to low
   * */
  window.generateBar = function(quality, qualityName, max, min, colors) {
      var bar = document.createElement('div');
      bar.className = 'bar';
      var value = document.createElement('div');
      value.className = 'barValue';
      var width = (quality - min)/(max - min);
      if (width > 1) {
          width = 1;
      } else if (width < 0) {
          width = 0;
      }
      value.style.width = Math.round(width*100) + '%';
      if (colors) {
          value.style.backgroundColor = window.probToColor(width*100);
      }
      bar.textContent = qualityName + ': ' + quality;
      if (colors) {
          bar.textContent += '/' + max;
      }
      bar.appendChild(value);
      return bar;
  };


  window.justLoaded = true;
window.statusTab = "status";
window.statusTab2 = "status_2.intel";
window.statusTab3 = "status_3.factions";

window.changeTab = function(newTab, tabId) {
    if (tabId == 'poll_tab' && dendryUI.dendryEngine.state.qualities.historical_mode) {
        window.alert('Polls are not available in historical mode.');
        return;
    }
    var tabButton = document.getElementById(tabId);
    var tabButtons = document.getElementsByClassName('tab_button');
    for (var i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(' active', '');
    }
    tabButton.className += ' active';
    window.statusTab = newTab;
    window.updateSidebar();
};

window.changeTab2 = function(newTab, tabId) {
    var tabButton = document.getElementById(tabId);
    var tabButtons = document.getElementById('stats_sidebar_2').getElementsByClassName('tab_button');
    for (var i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(' active', '');
    }
    tabButton.className += ' active';
    window.statusTab2 = newTab;
    window.updateSidebar();
};

window.changeTab3 = function(newTab, tabId) {
    var tabButton = document.getElementById(tabId);
    var tabButtons = document.getElementById('stats_sidebar_3').getElementsByClassName('tab_button');
    for (var i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(' active', '');
    }
    tabButton.className += ' active';
    window.statusTab3 = newTab;
    window.updateSidebar();
};

window.updateSidebar = function() {
    $('#qualities').empty();
    var scene = dendryUI.game.scenes[window.statusTab];
    dendryUI.dendryEngine._runActions(scene.onArrival);
    var displayContent = dendryUI.dendryEngine._makeDisplayContent(scene.content, true);
    $('#qualities').append(dendryUI.contentToHTML.convert(displayContent));

    $('#qualities_2').empty();
    var scene2 = dendryUI.game.scenes[window.statusTab2];
    if (scene2) {
        dendryUI.dendryEngine._runActions(scene2.onArrival);
        var displayContent2 = dendryUI.dendryEngine._makeDisplayContent(scene2.content, true);
        $('#qualities_2').append(dendryUI.contentToHTML.convert(displayContent2));
    }

    $('#qualities_3').empty();
    var scene3 = dendryUI.game.scenes[window.statusTab3];
    if (scene3) {
    dendryUI.dendryEngine._runActions(scene3.onArrival);
    var displayContent3 = dendryUI.dendryEngine._makeDisplayContent(scene3.content, true);
    $('#qualities_3').append(dendryUI.contentToHTML.convert(displayContent3));
    }

    var chartEl = document.getElementById('faction-chart');
    if (chartEl) {
    if (window.statusTab3 === 'status_3.factions') {
        chartEl.style.display = '';
        window.drawFactionChart();
    } else {
        chartEl.style.display = 'none';
    }
}

  var unionEl = document.getElementById('union-chart');
if (unionEl) {
    if (window.statusTab3 === 'status_3.unions') {
        unionEl.style.display = '';
        window.drawUnionChart();
    } else {
        unionEl.style.display = 'none';
    }
}
};

window.sidebar3Collapsed = false;

window.toggleSidebar3 = function() {
    var content = document.getElementById('qualities_3');
    var chart = document.getElementById('faction-chart');
    var btn = document.getElementById('collapse_3');
    window.sidebar3Collapsed = !window.sidebar3Collapsed;
    if (window.sidebar3Collapsed) {
        content.style.display = 'none';
        if (chart) chart.style.display = 'none';
        btn.textContent = '▼';
    } else {
        content.style.display = '';
        if (chart) chart.style.display = (window.statusTab3 === 'status_3.factions') ? '' : 'none';
        btn.textContent = '▲';
    }
};

window.dendryModifyUI = main;
console.log("Modifying stats: see dendryUI.dendryEngine.state.qualities");

window.onload = function() {
    window.dendryUI.loadSettings({show_portraits: false});
    if (window.dendryUI.dark_mode) {
        document.body.classList.add('dark-mode');
    }
    window.pinnedCardsDescription = "Advisor cards - actions are only usable once per 6 months.";
};

window.enableTypewriter = function() {
    window.dendryUI.typewriter = true;
    window.dendryUI.saveSettings();
};

window.disableTypewriter = function() {
    window.dendryUI.typewriter = false;
    window.dendryUI.saveSettings();
};


// This function allows you to modify the text before it's displayed.
  // E.g. wrapping chat-like messages in spans.

  
window.displayText = function(text) {
    if (!window.dendryUI.typewriter) return text;
    var i = 0;
    return text.replace(/(<[^>]+>)|(.)/gs, function(match, tag, char) {
        if (tag) return tag;
        return '<span class="tw" style="animation-delay:' + (i++ * 16) + 'ms">' + char + '</span>';
    });
};

window.drawFactionChart = function() {
    var Q = dendryUI.dendryEngine.state.qualities;
    var factions = [
        { name: 'Left FI',      strength: Q.left_fi_strength      || 0, dissent: Q.left_fi_dissent      || 0, color: '#8B0000' },
        { name: 'Left IN',      strength: Q.left_in_strength      || 0, dissent: Q.left_in_dissent      || 0, color: '#C40000' },
        { name: 'Center',       strength: Q.center_strength       || 0, dissent: Q.center_dissent       || 0, color: '#DCCA4A' },
        { name: 'Right Union',  strength: Q.right_union_strength  || 0, dissent: Q.right_union_dissent  || 0, color: '#69A2BE' },
        { name: 'Industrial',   strength: Q.industrial_strength   || 0, dissent: Q.industrial_dissent   || 0, color: '#D5AC27' },
        { name: 'Right SocDem', strength: Q.right_socdem_strength || 0, dissent: Q.right_socdem_dissent || 0, color: '#3F7BC1' },
    ];
    var container = document.getElementById('faction-chart');
    if (!container) return;
    var W = 200, H = 200, cx = 100, cy = 100, R = 80, r = 45;
    var total = factions.reduce(function(s, f) { return s + f.strength; }, 0);
    var angle = -Math.PI / 2;
    var svg = '<svg width="' + W + '" height="' + H + '" style="display:block;margin:0 auto;">';
    factions.forEach(function(f, idx) {
        if (f.strength <= 0) return;
        var slice = (f.strength / total) * 2 * Math.PI;
        var x1  = cx + R * Math.cos(angle),         y1  = cy + R * Math.sin(angle);
        var x2  = cx + R * Math.cos(angle + slice),  y2  = cy + R * Math.sin(angle + slice);
        var xi1 = cx + r * Math.cos(angle),          yi1 = cy + r * Math.sin(angle);
        var xi2 = cx + r * Math.cos(angle + slice),  yi2 = cy + r * Math.sin(angle + slice);
        var large = slice > Math.PI ? 1 : 0;
        var path = ['M',xi1,yi1,'L',x1,y1,'A',R,R,0,large,1,x2,y2,'L',xi2,yi2,'A',r,r,0,large,0,xi1,yi1,'Z'].join(' ');
        svg += '<path d="' + path + '" fill="' + f.color + '" stroke="none"'
             + ' style="cursor:pointer;opacity:0.9;"'
             + ' onclick="window._factionClick(' + idx + ')"'
             + ' onmouseover="this.style.opacity=1"'
             + ' onmouseout="this.style.opacity=0.9">'
             + '<title>' + f.name + ': ' + f.strength + '</title></path>';
        angle += slice;
    });
    svg += '</svg>';
    var legend = '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:4px;font-size:0.78em;">';
    factions.forEach(function(f, idx) {
        legend += '<span style="cursor:pointer;" onclick="window._factionClick(' + idx + ')">'
            + '<span style="display:inline-block;width:10px;height:10px;background:' + f.color
            + ';border-radius:2px;margin-right:3px;vertical-align:middle;"></span>'
            + f.name + ' ' + f.strength + '</span>';
    });
    legend += '</div>';
    var infoBox = '<div id="faction-info" style="text-align:center;font-size:0.85em;min-height:2em;padding:0.3em;"></div>';
    container.innerHTML = '<div style="display:flex;gap:1em;align-items:flex-start;">'
    + '<div>' + svg + '</div>'
    + '<div style="flex:1;">' + infoBox + legend + '</div>'
    + '</div>';
    window._factionData = factions;
};

window._factionClick = function(idx) {
    var f = window._factionData[idx];
    var el = document.getElementById('faction-info');
    if (el) el.innerHTML = '<strong>' + f.name + '</strong> &nbsp; Str: ' + f.strength + ' &nbsp; Dissent: ' + f.dissent;
};



window.unionChartMode = 'strength';

window.drawUnionChart = function() {
    var Q = dendryUI.dendryEngine.state.qualities;
    var unions = [
        { id: 'awu',   name: 'AWU'   },
        { id: 'mf',    name: 'MF'    },
        { id: 'wwf',   name: 'WWF'   },
        { id: 'fia',   name: 'FIA'   },
        { id: 'aru',   name: 'ARU'   },
        { id: 'bwiu',  name: 'BWIU'  },
        { id: 'fedfa', name: 'FEDFA' },
        { id: 'seamen',name: 'Seamen'},
        { id: 'aeu',   name: 'AEU'   },
        { id: 'asce',  name: 'ASCE'  },
        { id: 'fcu',   name: 'FCU'   },
        { id: 'twu',   name: 'TWU'   },
        { id: 'aja',   name: 'AJA'   },
        { id: 'pieua', name: 'PIEUA' },
        { id: 'actu',  name: 'ACTU'  },
    ];

    var modeKey = window.unionChartMode;
    var modeField = {
        strength:  function(u) { return Q[u.id + '_strength']  || 0; },
        militancy: function(u) { return Q[u.id + '_militancy'] || 0; },
        communist: function(u) { return Q[u.id + '_communist'] || 0; },
        grouper:   function(u) { return Q[u.id + '_grouper']   || 0; },
    };
    var modeColor = {
        strength:  '#3F7BC1',
        militancy: '#C40000',
        communist: '#8B0000',
        grouper:   '#DCCA4A',
    };

    var getValue = modeField[modeKey];
    var color = modeColor[modeKey];

    var container = document.getElementById('union-chart');
    if (!container) return;

    // mode buttons
    var modes = ['strength','militancy','communist','grouper'];
    var modeLabels = {strength:'Strength', militancy:'Militancy', communist:'Communist', grouper:'Grouper'};
    var showGrouper = Q.santamaria_game ? true : false;

    var buttons = '<div style="margin-bottom:0.4em;font-size:0.78em;">';
    modes.forEach(function(m) {
        if (m === 'grouper' && !showGrouper) return;
        var active = m === modeKey ? 'background:var(--content-bg-color);font-weight:bold;' : 'background:var(--tab-color);';
        buttons += '<button onclick="window.unionChartMode=\'' + m + '\';window.drawUnionChart();"'
            + ' style="' + active + 'border:none;padding:3px 7px;cursor:pointer;font-family:inherit;color:var(--text-color);margin-right:2px;">'
            + modeLabels[m] + '</button>';
    });
    buttons += '</div>';

    // donut chart
    var W = 200, H = 200, cx = 100, cy = 100, R = 80, r = 45;
    var total = unions.reduce(function(s, u) { return s + getValue(u); }, 0);
    var svg = '<svg width="' + W + '" height="' + H + '" style="display:block;margin:0 auto;">';

    if (total > 0) {
        var angle = -Math.PI / 2;
        unions.forEach(function(u, idx) {
            var val = getValue(u);
            if (val <= 0) return;
            var slice = (val / total) * 2 * Math.PI;
            var x1  = cx + R * Math.cos(angle),        y1  = cy + R * Math.sin(angle);
            var x2  = cx + R * Math.cos(angle+slice),   y2  = cy + R * Math.sin(angle+slice);
            var xi1 = cx + r * Math.cos(angle),         yi1 = cy + r * Math.sin(angle);
            var xi2 = cx + r * Math.cos(angle+slice),   yi2 = cy + r * Math.sin(angle+slice);
            var large = slice > Math.PI ? 1 : 0;
            // shade each slice slightly differently
            var shade = Math.round(60 + (idx / unions.length) * 140);
            var sliceColor = color;
            var path = ['M',xi1,yi1,'L',x1,y1,'A',R,R,0,large,1,x2,y2,'L',xi2,yi2,'A',r,r,0,large,0,xi1,yi1,'Z'].join(' ');
            svg += '<path d="' + path + '" fill="' + sliceColor + '" stroke="#fff" stroke-width="0.5"'
                 + ' style="cursor:pointer;opacity:' + (0.4 + (idx / unions.length) * 0.6).toFixed(2) + ';"'
                 + ' onclick="window._unionClick(' + idx + ')"'
                 + ' onmouseover="this.style.opacity=1"'
                 + ' onmouseout="this.style.opacity=' + (0.4 + (idx / unions.length) * 0.6).toFixed(2) + '">'
                 + '<title>' + u.name + ': ' + val + '</title></path>';
            angle += slice;
        });
    } else {
        // empty ring
        svg += '<circle cx="100" cy="100" r="80" fill="none" stroke="#ccc" stroke-width="35"/>';
    }
    svg += '</svg>';

    var infoBox = '<div id="union-info" style="text-align:center;font-size:0.85em;min-height:2em;padding:0.2em;"></div>';

    var legend = '<div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:4px;font-size:0.75em;">';
    unions.forEach(function(u, idx) {
        var val = getValue(u);
        var opacity = (0.4 + (idx / unions.length) * 0.6).toFixed(2);
        legend += '<span style="cursor:pointer;opacity:' + opacity + ';" onclick="window._unionClick(' + idx + ')">'
            + '<span style="display:inline-block;width:8px;height:8px;background:' + color
            + ';border-radius:2px;margin-right:2px;vertical-align:middle;"></span>'
            + u.name + ' ' + val + '</span> ';
    });
    legend += '</div>';

    container.innerHTML = buttons
        + '<div style="display:flex;gap:1em;align-items:flex-start;">'
        + '<div>' + svg + '</div>'
        + '<div style="flex:1;">' + infoBox + legend + '</div>'
        + '</div>';

    window._unionData = unions.map(function(u) {
        return { name: u.name, value: getValue(u),
                 strength: Q[u.id+'_strength']||0, militancy: Q[u.id+'_militancy']||0,
                 communist: Q[u.id+'_communist']||0, grouper: Q[u.id+'_grouper']||0 };
    });
};
}());
