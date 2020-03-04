import React from 'react';
import US from './US';
import AL from './AL';
import AR from './AR';
import CA from './CA';
import CO from './CO';
import IA from './IA';
import NV from './NV';
import MA from './MA';
import ME from './ME';
import MN from './MN';
import NC from './NC';
import NH from './NH';
import OK from './OK';
import SC from './SC';
import TN from './TN';
import TX from './TX';
import UT from './UT';
import VA from './VA';
import VT from './VT';

class Svg extends React.Component {
  render() {
    return (
      <svg style={{ display: 'none' }}>
        <AL />
        <AR />
        <CA />
        <CO />
        <IA />
        <NV />
        <MA />
        <ME />
        <MN />
        <NC />
        <NH />
        <OK />
        <SC />
        <TN />
        <TX />
        <UT />
        <VA />
        <VT />
        <US />
      </svg>
    );
  }
}

export default Svg;
