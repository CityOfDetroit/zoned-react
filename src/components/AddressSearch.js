
import React from 'react';
import { AutoComplete } from 'antd';
import 'antd/lib/auto-complete/style/css';
import _ from 'lodash';

function onSelect(value) {
  console.log('onSelect', value);
}

class AddressSearch extends React.Component {
  state = {
    dataSource: [],
  }

  suggestAddress(value) {
    if(value !== '') {
      fetch(`http://gis.detroitmi.gov/arcgis/rest/services/DoIT/AddressPointGeocoder/GeocodeServer/suggest?text=${value}&f=pjson`)
      .then(r => r.json())
      .then(d => {
        this.setState({
          dataSource: !value ? [] : _.map(d.suggestions, 'text')
        })
      })
    }
  }

  handleSearch = (value) => {
    this.suggestAddress(value)
  }

  render() {
    const { dataSource } = this.state;
    return (
      <AutoComplete
        dataSource={dataSource}
        style={{ width: 200 }}
        onSelect={onSelect}
        onSearch={this.handleSearch}
        placeholder="input here"
      />
    );
  }
}

export default AddressSearch;