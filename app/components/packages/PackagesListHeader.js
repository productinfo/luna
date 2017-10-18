import React from 'react';
import { remote, ipcRenderer} from 'electron';
import styles from './Packages.css';

class PackagesListHeader extends React.Component {
  constructor(props) {
    super(props);
    this.reload = this.reload.bind(this);
  }
  reload() {
    this.props.toggleLoader(true);
    this.props.clearNotifications();
    ipcRenderer.send('ipc-event', {
      ipcEvent: 'get-packages',
      params: ['g', 'long']
    });
  }
  render() {
    let props = this.props;
    return (
      <div className={styles.packages__head}>
        <div className={styles.packages__title}>
          <span>{props.title}</span>&nbsp;
          <span className="label" style={{color: '#fff'}}>{props.total}</span>
        </div>
        <div className={styles.packages__actions}>
          <div className={styles.packages__action}>
            <i className="fa fa-fw fa-refresh" onClick={this.reload} title="Reload"></i>
          </div>
        </div>
      </div>
    )
  }
}

export default PackagesListHeader;