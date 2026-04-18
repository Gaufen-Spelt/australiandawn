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
  };

  var TITLE = "Social Democracy: An Alternate History" + '_' + "Autumn Chen";

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

  window.enableDialogueAnim = function() {
    window.dendryUI.dialogue_anim = true;
    window.dendryUI.saveSettings();
  };

  window.disableDialogueAnim = function() {
    window.dendryUI.dialogue_anim = false;
    window.dendryUI.saveSettings();
  };

  window.enableLightMode = function() {
      window.dendryUI.dark_mode = false;
      window.dendryUI.classic_mode = false;
      document.body.classList.remove('dark-mode', 'classic-mode');
      window.dendryUI.saveSettings();
  };

  window.enableDarkMode = function() {
      window.dendryUI.dark_mode = true;
      window.dendryUI.classic_mode = false;
      document.body.classList.remove('classic-mode');
      document.body.classList.add('dark-mode');
      window.dendryUI.saveSettings();
  };

  window.enableClassicMode = function() {
      window.dendryUI.dark_mode = false;
      window.dendryUI.classic_mode = true;
      document.body.classList.remove('dark-mode');
      document.body.classList.add('classic-mode');
      window.dendryUI.saveSettings();
  };

  window.populateOptions = function() {
    var disable_bg = window.dendryUI.disable_bg;
    var animate = window.dendryUI.animate;
    var disable_audio = window.dendryUI.disable_audio;
    var show_portraits = window.dendryUI.show_portraits;

    if (disable_bg) { $('#backgrounds_no')[0].checked = true; }
    else { $('#backgrounds_yes')[0].checked = true; }

    if (animate) { $('#animate_yes')[0].checked = true; }
    else { $('#animate_no')[0].checked = true; }

    if (disable_audio) { $('#audio_no')[0].checked = true; }
    else { $('#audio_yes')[0].checked = true; }

    if (show_portraits) { $('#images_yes')[0].checked = true; }
    else { $('#images_no')[0].checked = true; }

    if (window.dendryUI.dark_mode) {
        $('#dark_mode')[0].checked = true;
    } else if (window.dendryUI.classic_mode) {
        $('#classic_mode')[0].checked = true;
    } else {
        $('#light_mode')[0].checked = true;
    }

    if (window.dendryUI.typewriter) {
        $('#typewriter_yes')[0].checked = true;
    } else {
        $('#typewriter_no')[0].checked = true;
    }

    if (window.dendryUI.dialogue_anim !== false) {
        $('#dialogue_anim_yes')[0].checked = true;
    } else {
        $('#dialogue_anim_no')[0].checked = true;
    }
  };

  window.onload = function() {
      // Force-hide all sidebars at boot before Dendry can set inline styles
      $('#stats_sidebar').hide();
      $('#stats_sidebar_2').hide();
      $('#stats_sidebar_3').hide();
      $('#stats_sidebar_4').hide();
      $('#stats_sidebar_5').hide();
      $('#stats_sidebar_6').hide();

      window.dendryUI.loadSettings({show_portraits: false});

      if (window.dendryUI.dark_mode) {
          document.body.classList.add('dark-mode');
      } else if (window.dendryUI.classic_mode) {
          document.body.classList.add('classic-mode');
      }

      window.pinnedCardsDescription = "Advisor cards - actions are only usable once per 6 months.";
  };

  window.handleSignal = function(signal, event, scene_id) {
  };

  window.onNewPage = function() {
    var scene = window.dendryUI.dendryEngine.state.sceneId;
    if (scene != 'root' && !window.justLoaded) {
        window.dendryUI.autosave();
    }
    if (window.justLoaded) {
        window.justLoaded = false;
    }
  };

  window.onDisplayContent = function() {
    window.updateSidebar();
    window._dialogueRestore();
  };

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

  window.dendryModifyUI = main;

}());

// ─── Global state ─────────────────────────────────────────

window.justLoaded = true;
window.statusTab  = "status";
window.statusTab2 = "status_2.intel";
window.statusTab3 = "status_3.factions";
window.statusTab4 = "status_4.comm";
window.statusTab5 = "status_5.network";
window.statusTab6 = "status_6.data";
window.sidebar6Collapsed = false;
window.sidebar3Collapsed = false;

console.log("Modifying stats: see dendryUI.dendryEngine.state.qualities");

// ─── Tab switching ────────────────────────────────────────

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

window.changeTab4 = function(newTab, tabId) {
    var tabButton = document.getElementById(tabId);
    var tabButtons = document.getElementById('stats_sidebar_4').getElementsByClassName('tab_button');
    for (var i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(' active', '');
    }
    tabButton.className += ' active';
    window.statusTab4 = newTab;
    window.updateSidebar();
};

window.changeTab5 = function(newTab, tabId) {
    var tabButton = document.getElementById(tabId);
    var tabButtons = document.getElementById('stats_sidebar_5').getElementsByClassName('tab_button');
    for (var i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(' active', '');
    }
    tabButton.className += ' active';
    window.statusTab5 = newTab;
    window.updateSidebar();
};

window.changeTab6 = function(newTab, tabId) {
    var tabButton = document.getElementById(tabId);
    var tabButtons = document.getElementById('stats_sidebar_6').getElementsByClassName('tab_button');
    for (var i = 0; i < tabButtons.length; i++) {
        tabButtons[i].className = tabButtons[i].className.replace(' active', '');
    }
    tabButton.className += ' active';
    window.statusTab6 = newTab;
    window.updateSidebar();
};

// ─── Sidebar collapse toggles ─────────────────────────────

window.toggleSidebar3 = function() {
    var content = document.getElementById('qualities_3');
    var chart   = document.getElementById('faction-chart');
    var unionEl = document.getElementById('union-chart');
    var btn     = document.getElementById('collapse_3');
    window.sidebar3Collapsed = !window.sidebar3Collapsed;
    if (window.sidebar3Collapsed) {
        content.style.display = 'none';
        if (chart)   chart.style.display = 'none';
        if (unionEl) unionEl.style.display = 'none';
        btn.textContent = '▼';
    } else {
        content.style.display = '';
        var showCharts = (window.statusTab3 === 'status_3.factions') ? '' : 'none';
        if (chart)   chart.style.display = showCharts;
        if (unionEl) unionEl.style.display = showCharts;
        btn.textContent = '▲';
    }
};

window.toggleSidebar6 = function() {
    var content = document.getElementById('qualities_6');
    var btn     = document.getElementById('collapse_6');
    window.sidebar6Collapsed = !window.sidebar6Collapsed;
    if (window.sidebar6Collapsed) {
        content.style.display = 'none';
        btn.textContent = '▼';
    } else {
        content.style.display = '';
        btn.textContent = '▲';
    }
};

// ─── Sidebar show/hide (scene-callable) ───────────────────

window.showSidebars = function() {
    var Q = dendryUI.dendryEngine.state.qualities;
    if (!Q) return;
    if (Q.modem === 1) {
        $('#stats_sidebar_4').show();
        $('#stats_sidebar_5').show();
        $('#stats_sidebar_6').show();
    } else {
        $('#stats_sidebar').show();
        $('#stats_sidebar_2').show();
        $('#stats_sidebar_3').show();
    }
    window.updateSidebar();
};

window.hideSidebars = function() {
    $('#stats_sidebar').hide();
    $('#stats_sidebar_2').hide();
    $('#stats_sidebar_3').hide();
    $('#stats_sidebar_4').hide();
    $('#stats_sidebar_5').hide();
    $('#stats_sidebar_6').hide();
};

// ─── Core sidebar renderer ────────────────────────────────
//
// updateSidebar ONLY renders content into whichever sidebars
// are already visible. It does NOT show hidden sidebars.
// The one exception is the modem group-swap: if modem changes,
// it hides the outgoing group and shows the incoming group,
// because leaving the wrong group visible would be broken.

window.updateSidebar = function() {
    var Q = dendryUI.dendryEngine.state.qualities;
    if (!Q) return;

    var group1Visible = $('#stats_sidebar').is(':visible');
    var group2Visible = $('#stats_sidebar_4').is(':visible');

    // Modem group-swap: only triggers when the active group doesn't
    // match the current modem state. Doesn't show anything that
    // wasn't already shown by showSidebars().
    if (Q.modem === 1 && group1Visible && !group2Visible) {
        $('#stats_sidebar').hide();
        $('#stats_sidebar_2').hide();
        $('#stats_sidebar_3').hide();
        $('#stats_sidebar_4').show();
        $('#stats_sidebar_5').show();
        $('#stats_sidebar_6').show();
        group1Visible = false;
        group2Visible = true;
    } else if (Q.modem !== 1 && group2Visible && !group1Visible) {
        $('#stats_sidebar_4').hide();
        $('#stats_sidebar_5').hide();
        $('#stats_sidebar_6').hide();
        $('#stats_sidebar').show();
        $('#stats_sidebar_2').show();
        $('#stats_sidebar_3').show();
        group1Visible = true;
        group2Visible = false;
    }

    if (group2Visible) {
        // Render group 2 content
        $('#qualities_4').empty();
        var scene4 = dendryUI.game.scenes[window.statusTab4];
        if (scene4) {
            dendryUI.dendryEngine._runActions(scene4.onArrival);
            var dc4 = dendryUI.dendryEngine._makeDisplayContent(scene4.content, true);
            $('#qualities_4').append(dendryUI.contentToHTML.convert(dc4));
        }

        $('#qualities_5').empty();
        var scene5 = dendryUI.game.scenes[window.statusTab5];
        if (scene5) {
            dendryUI.dendryEngine._runActions(scene5.onArrival);
            var dc5 = dendryUI.dendryEngine._makeDisplayContent(scene5.content, true);
            $('#qualities_5').append(dendryUI.contentToHTML.convert(dc5));
        }

        if (!window.sidebar6Collapsed) {
            $('#qualities_6').empty();
            var scene6 = dendryUI.game.scenes[window.statusTab6];
            if (scene6) {
                dendryUI.dendryEngine._runActions(scene6.onArrival);
                var dc6 = dendryUI.dendryEngine._makeDisplayContent(scene6.content, true);
                $('#qualities_6').append(dendryUI.contentToHTML.convert(dc6));
            }
        }
    }

    if (group1Visible) {
        // Render group 1 content
        $('#qualities').empty();
        var scene = dendryUI.game.scenes[window.statusTab];
        if (scene) {
            dendryUI.dendryEngine._runActions(scene.onArrival);
            var dc = dendryUI.dendryEngine._makeDisplayContent(scene.content, true);
            $('#qualities').append(dendryUI.contentToHTML.convert(dc));
        }

        $('#qualities_2').empty();
        var scene2 = dendryUI.game.scenes[window.statusTab2];
        if (scene2) {
            dendryUI.dendryEngine._runActions(scene2.onArrival);
            var dc2 = dendryUI.dendryEngine._makeDisplayContent(scene2.content, true);
            $('#qualities_2').append(dendryUI.contentToHTML.convert(dc2));
        }

        if (!window.sidebar3Collapsed) {
            $('#qualities_3').empty();
            var scene3 = dendryUI.game.scenes[window.statusTab3];
            if (scene3) {
                dendryUI.dendryEngine._runActions(scene3.onArrival);
                var dc3 = dendryUI.dendryEngine._makeDisplayContent(scene3.content, true);
                $('#qualities_3').append(dendryUI.contentToHTML.convert(dc3));
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
                if (window.statusTab3 === 'status_3.factions') {
                    unionEl.style.display = '';
                    window.drawUnionChart();
                } else {
                    unionEl.style.display = 'none';
                }
            }
        }
    }
};

// ─── Typewriter ───────────────────────────────────────────

window.enableTypewriter = function() {
    window.dendryUI.typewriter = true;
    window.dendryUI.saveSettings();
};

window.disableTypewriter = function() {
    window.dendryUI.typewriter = false;
    window.dendryUI.saveSettings();
};

window.displayText = function(text) {
    if (!window.dendryUI.typewriter) return text;
    var i = 0;
    return text.replace(/(<[^>]+>)|(.)/gs, function(match, tag, char) {
        if (tag) return tag;
        return '<span class="tw" style="animation-delay:' + (i++ * 26) + 'ms">' + char + '</span>';
    });
};

// ─── Faction chart ────────────────────────────────────────

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
        var x1  = cx + R * Math.cos(angle),        y1  = cy + R * Math.sin(angle);
        var x2  = cx + R * Math.cos(angle + slice), y2  = cy + R * Math.sin(angle + slice);
        var xi1 = cx + r * Math.cos(angle),         yi1 = cy + r * Math.sin(angle);
        var xi2 = cx + r * Math.cos(angle + slice), yi2 = cy + r * Math.sin(angle + slice);
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
    container.innerHTML = svg + infoBox + legend;
    window._factionData = factions;
};

window._factionClick = function(idx) {
    var f = window._factionData[idx];
    var el = document.getElementById('faction-info');
    if (el) el.innerHTML = '<strong>' + f.name + '</strong> &nbsp; Str: ' + f.strength + ' &nbsp; Dissent: ' + f.dissent;
};

// ─── Union chart ──────────────────────────────────────────

window.unionChartMode = 'strength';

window.drawUnionChart = function() {
    var Q = dendryUI.dendryEngine.state.qualities;
    var unions = [
        { id: 'awu',    name: 'AWU'    },
        { id: 'mf',     name: 'MF'     },
        { id: 'wwf',    name: 'WWF'    },
        { id: 'fia',    name: 'FIA'    },
        { id: 'aru',    name: 'ARU'    },
        { id: 'bwiu',   name: 'BWIU'   },
        { id: 'fedfa',  name: 'FEDFA'  },
        { id: 'seamen', name: 'Seamen' },
        { id: 'aeu',    name: 'AEU'    },
        { id: 'asce',   name: 'ASCE'   },
        { id: 'fcu',    name: 'FCU'    },
        { id: 'twu',    name: 'TWU'    },
        { id: 'aja',    name: 'AJA'    },
        { id: 'pieua',  name: 'PIEUA'  },
        { id: 'actu',   name: 'ACTU'   },
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
    var color    = modeColor[modeKey];

    var container = document.getElementById('union-chart');
    if (!container) return;

    var modes      = ['strength','militancy','communist','grouper'];
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

    var W = 200, H = 200, cx = 100, cy = 100, R = 80, r = 45;
    var total = unions.reduce(function(s, u) { return s + getValue(u); }, 0);
    var svg = '<svg width="' + W + '" height="' + H + '" style="display:block;margin:0 auto;">';

    if (total > 0) {
        var angle = -Math.PI / 2;
        unions.forEach(function(u, idx) {
            var val = getValue(u);
            if (val <= 0) return;
            var slice = (val / total) * 2 * Math.PI;
            var x1  = cx + R * Math.cos(angle),       y1  = cy + R * Math.sin(angle);
            var x2  = cx + R * Math.cos(angle+slice),  y2  = cy + R * Math.sin(angle+slice);
            var xi1 = cx + r * Math.cos(angle),        yi1 = cy + r * Math.sin(angle);
            var xi2 = cx + r * Math.cos(angle+slice),  yi2 = cy + r * Math.sin(angle+slice);
            var large = slice > Math.PI ? 1 : 0;
            var opacity = (0.4 + (idx / unions.length) * 0.6).toFixed(2);
            var path = ['M',xi1,yi1,'L',x1,y1,'A',R,R,0,large,1,x2,y2,'L',xi2,yi2,'A',r,r,0,large,0,xi1,yi1,'Z'].join(' ');
            svg += '<path d="' + path + '" fill="' + color + '" stroke="#fff" stroke-width="0.5"'
                 + ' style="cursor:pointer;opacity:' + opacity + ';"'
                 + ' onclick="window._unionClick(' + idx + ')"'
                 + ' onmouseover="this.style.opacity=1"'
                 + ' onmouseout="this.style.opacity=' + opacity + '">'
                 + '<title>' + u.name + ': ' + val + '</title></path>';
            angle += slice;
        });
    } else {
        svg += '<circle cx="100" cy="100" r="80" fill="none" stroke="#ccc" stroke-width="35"/>';
    }
    svg += '</svg>';

    var infoBox = '<div id="union-info" style="text-align:center;font-size:0.85em;min-height:2em;padding:0.2em;"></div>';

    var legend = '<div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:4px;font-size:0.75em;">';
    unions.forEach(function(u, idx) {
        var val     = getValue(u);
        var opacity = (0.4 + (idx / unions.length) * 0.6).toFixed(2);
        legend += '<span style="cursor:pointer;opacity:' + opacity + ';" onclick="window._unionClick(' + idx + ')">'
            + '<span style="display:inline-block;width:8px;height:8px;background:' + color
            + ';border-radius:2px;margin-right:2px;vertical-align:middle;"></span>'
            + u.name + ' ' + val + '</span> ';
    });
    legend += '</div>';

    container.innerHTML = buttons + svg + infoBox + legend;

    window._unionData = unions.map(function(u) {
        return { name: u.name, value: getValue(u),
                 strength:  Q[u.id+'_strength']  || 0,
                 militancy: Q[u.id+'_militancy'] || 0,
                 communist: Q[u.id+'_communist'] || 0,
                 grouper:   Q[u.id+'_grouper']   || 0 };
    });
};

window._unionClick = function(idx) {
    var u  = window._unionData[idx];
    var el = document.getElementById('union-info');
    if (el) el.innerHTML = '<strong>' + u.name + '</strong>'
        + ' &nbsp; Str: ' + u.strength
        + ' &nbsp; Mil: ' + u.militancy
        + ' &nbsp; Com: ' + u.communist
        + (u.grouper !== undefined ? ' &nbsp; Grp: ' + u.grouper : '');
};

// ─── Dialogue system ──────────────────────────────────────
//
// addDialogue(opts) — supported opts:
//   id       {string}  Character id (used for portrait lookup & color hashing)
//   name     {string}  Display name shown above bubble
//   side     {string}  'left' | 'right' | 'center'
//   text     {string}  Bubble text
//   img      {string}  Optional explicit portrait path (overrides id-based lookup)
//   delay    {number}  ms to wait after this entry before showing the next one.
//                      Overrides the global _dialogueAnimDelay() for this entry only.
//                      E.g. delay:2200 for a long pause, delay:400 for a quick beat.
//   duration {number}  ms for the fade-in/slide-in CSS transition of this entry.
//                      Overrides the default 0.45s (450ms).
//                      E.g. duration:900 for a slow dramatic reveal, duration:150 for a snap.

window._dialogueSceneId   = null;
window._dialogueContainer = null;
window._dialogueQueue     = [];
window._dialoguePlaying   = false;

window._dialoguePalette = [
    '#6B2A1A','#3A5A3A','#2A3A5A','#5A3A6B',
    '#6B5A2A','#2A5A5A','#5A2A3A','#3A3A5A',
];

window._dialogueColorFor = function(id) {
    var hash = 0;
    for (var i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return window._dialoguePalette[Math.abs(hash) % window._dialoguePalette.length];
};

window._dialogueInitials = function(name) {
    return name.split(' ').map(function(w) { return w[0]; }).join('').slice(0,2).toUpperCase();
};

window._dialogueAnimEnabled = function() {
    return window.dendryUI && window.dendryUI.dialogue_anim !== false;
};

// Global fallback delay (ms) between entries when no per-entry delay is set.
window._dialogueAnimDelay = function() {
    return window.dendryUI && window.dendryUI.typewriter ? 1400 : 1050;
};

window._getOrCreateDialogueLog = function() {
    var currentScene = window.dendryUI.dendryEngine.state.sceneId;
    if (currentScene !== window._dialogueSceneId) {
        window._dialogueSceneId   = currentScene;
        window._dialogueContainer = null;
        window._dialogueQueue     = [];
        window._dialoguePlaying   = false;
    }
    if (!window._dialogueContainer) {
        var log = document.createElement('div');
        log.className = 'dialogue-log';
        document.getElementById('content').appendChild(log);
        window._dialogueContainer = log;
    }
    return window._dialogueContainer;
};

// _buildDialogueEntry(opts, instant)
//   opts.duration overrides the 450ms default transition duration for this entry.
window._buildDialogueEntry = function(opts, instant) {
    var id       = opts.id       || 'unknown';
    var name     = opts.name     || id;
    var side     = opts.side     || 'left';
    var text     = opts.text     || '';
    var img      = opts.img      || null;
    // Per-entry transition duration in ms; falls back to 450ms if not specified.
    var duration = (opts.duration != null) ? opts.duration : 450;

    var entry = document.createElement('div');
    entry.className = 'dialogue-entry ' + side;

    if (!instant) {
        entry.style.opacity    = '0';
        entry.style.transform  = 'translateY(6px)';
        entry.style.transition = 'opacity ' + (duration / 1000).toFixed(3) + 's ease, '
                               + 'transform ' + (duration / 1000).toFixed(3) + 's ease';
    } else {
        entry.style.opacity    = '1';
        entry.style.transform  = 'translateY(0)';
        entry.style.transition = 'none';
    }

    if (side !== 'center') {
        var portrait = document.createElement('div');
        portrait.className = 'dialogue-portrait';
        var imgPath = img || ('img/' + id + '.jpg');
        var imgEl = document.createElement('img');
        imgEl.src = imgPath;
        imgEl.onerror = function() {
            portrait.removeChild(imgEl);
            portrait.style.backgroundColor = window._dialogueColorFor(id);
            portrait.textContent = window._dialogueInitials(name);
        };
        portrait.appendChild(imgEl);
        entry.appendChild(portrait);
    }

    var bubble = document.createElement('div');
    bubble.className = 'dialogue-bubble';

    if (side !== 'center' && name) {
        var nameEl = document.createElement('div');
        nameEl.className = 'dialogue-name';
        nameEl.textContent = name;
        bubble.appendChild(nameEl);
    }

    var textEl = document.createElement('p');
    textEl.textContent = text;
    bubble.appendChild(textEl);
    entry.appendChild(bubble);

    return entry;
};

// _dialoguePlayQueue: uses opts.delay (if set) as the post-entry pause,
// otherwise falls back to _dialogueAnimDelay().
window._dialoguePlayQueue = function() {
    if (window._dialoguePlaying) return;
    if (window._dialogueQueue.length === 0) return;

    window._dialoguePlaying = true;
    var log     = window._getOrCreateDialogueLog();
    var animate = window._dialogueAnimEnabled();

    function playNext() {
        if (window._dialogueQueue.length === 0) {
            window._dialoguePlaying = false;
            return;
        }
        var opts  = window._dialogueQueue.shift();
        var entry = window._buildDialogueEntry(opts, !animate);
        log.appendChild(entry);

        // Resolve the post-display pause: per-entry opts.delay beats global default.
        var pause = (opts.delay != null) ? opts.delay : window._dialogueAnimDelay();

        if (animate) {
            requestAnimationFrame(function() {
                requestAnimationFrame(function() {
                    entry.style.opacity   = '1';
                    entry.style.transform = 'translateY(0)';
                    setTimeout(playNext, pause);
                });
            });
        } else {
            setTimeout(playNext, 0);
        }
    }

    playNext();
};

window.addDialogue = function(opts) {
    window._getOrCreateDialogueLog();
    window._dialogueQueue.push(opts);
    window._dialoguePlayQueue();
};

window.clearDialogue = function() {
    if (window._dialogueContainer) {
        window._dialogueContainer.innerHTML = '';
    }
    window._dialogueSceneId   = null;
    window._dialogueContainer = null;
    window._dialogueQueue     = [];
    window._dialoguePlaying   = false;
};

window._dialogueRestore = function() {};
