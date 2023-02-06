import { Grid, Row, Col } from 'rsuite';
import { FileImportForm } from '../FileImportForm';

export default function ZondaFileImport() {
  return (
    <Grid fluid>
      <Row className="show-grid">
        <Col xs={24} sm={24} md={24}>
          <FileImportForm importType={'BINANCE'} />
        </Col>
      </Row>
    </Grid>
  );
}
