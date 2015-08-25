
  var CodeMirror = React.createFactory(CodeMirrorEditor);
  var div = React.createFactory('div');
  var h1 = React.createFactory('h1');
  var p = React.createFactory('p');
  var pre = React.createFactory('pre');
  var code = React.createFactory('code');

  function testJSON(text){
    try{
        JSON.parse(text);
        return true;
    }
    catch (error){
        return false;
    }
}

  var Application = React.createClass({
    getDefaultProps: function() {
      return {
        position: [39.50, -98.35],
        zoom: 4
      };
    },

    getInitialState: function () {
      return {
        src: '{}'
      };
    },
    componentDidMount: function() {
      var that = this;
      that.map = L.map(this.refs.map.getDOMNode()).setView(this.props.position, this.props.zoom);

      L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(that.map);

    },
    
    componentDidUpdate: function() {
      var that = this;

       if(testJSON(this.state.src)) {
 
         var topoLayer = omnivore.topojson.parse(this.state.src);
         topoLayer.addTo(that.map);

      }

    },
    render: function () {   
      return div({},
        CodeMirror({
          style: {border: '1px solid black'},
          textAreaClassName: ['form-control'],
          textAreaStyle: {minHeight: '10em'},
          value: JSON.stringify(JSON.parse(this.state.src), null, '\t'),
          mode: 'javascript',
          theme: 'solarized',
          lineNumbers: true,
          onChange: function (e) {
            this.setState({src: e.target.value});
          }.bind(this)
        }),
       <div ref="map" style={{height: 300}} />
      );
    }
  });

  React.render(React.createElement(Application), document.getElementById('container'));
