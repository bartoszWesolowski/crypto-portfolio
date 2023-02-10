import { Grid, Row, Col } from 'rsuite';
import { FileImportForm } from '../FileImportForm';

export default function BinanceCsvFileImport() {
  return (
    <Grid fluid>
      <Row className="show-grid">
        <Col xs={24} sm={24} md={24}>
          <h1>Binance CSV transactions file import</h1>
          <FileImportForm importType={'BINANCE_CSV'} />
        </Col>
      </Row>
    </Grid>
  );
}
