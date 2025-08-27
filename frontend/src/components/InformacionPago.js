import React from 'react';
import { Card, Alert, Row, Col, Badge } from 'react-bootstrap';
import { calcularTotal, formatearPrecio } from '../utils/config';

export default function InformacionPago({ metodoPago, total = 0 }) {
  if (!metodoPago || metodoPago === 'efectivo') {
    return null;
  }

  const renderTransferencia = () => (
    <Card className="border-primary">
      <Card.Header className="bg-primary text-white">
        <h5 className="mb-0">🏦 Información para Transferencia Bancaria</h5>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={6}>
            <div className="mb-3">
              <strong>Banco:</strong> Banco General
            </div>
            <div className="mb-3">
              <strong>Tipo de Cuenta:</strong> Cuenta de Ahorros
            </div>
            <div className="mb-3">
              <strong>Número de Cuenta:</strong> 
              <div className="font-monospace bg-light p-2 rounded">
                04-01-01-123456-7
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="mb-3">
              <strong>Beneficiario:</strong> Hugo's Delights
            </div>
            <div className="mb-3">
              <strong>Cédula:</strong> 8-123-456
            </div>
            <div className="mb-3">
              <strong>Monto a Transferir:</strong>
              <Badge bg="success" className="fs-6 p-2">
                {formatearPrecio(calcularTotal(total))}
              </Badge>
            </div>
          </Col>
        </Row>
        <Alert variant="info" className="mt-3">
          <strong>📝 Instrucciones:</strong>
          <ul className="mb-0 mt-2">
            <li>Realiza la transferencia por el monto exacto indicado</li>
            <li>Envía el comprobante por WhatsApp al: <strong>6123-4567</strong></li>
            <li>Incluye tu nombre completo en el mensaje</li>
            <li>Tu pedido será confirmado al recibir el comprobante</li>
          </ul>
        </Alert>
      </Card.Body>
    </Card>
  );

  const renderYappy = () => (
    <Card className="border-warning">
      <Card.Header className="bg-warning text-dark">
        <h5 className="mb-0">📱 Información para Pago con Yappy</h5>
      </Card.Header>
      <Card.Body>
        <div className="text-center mb-4">
          <div className="display-1 mb-3">📱</div>
          <h3 className="text-warning">Yappy</h3>
        </div>
        
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="text-center mb-3">
              <strong>Número de Yappy para transferir:</strong>
              <div className="font-monospace bg-warning bg-opacity-25 p-3 rounded fs-4 fw-bold mt-2">
                6123-4567
              </div>
            </div>
            
            <div className="text-center mb-3">
              <strong>Nombre del Beneficiario:</strong>
              <div className="fs-5 fw-bold">Hugo's Delights</div>
            </div>
            
            <div className="text-center mb-4">
              <strong>Monto a Enviar:</strong>
              <Badge bg="warning" text="dark" className="fs-4 p-3 d-block mt-2">
                {formatearPrecio(calcularTotal(total))}
              </Badge>
            </div>
          </Col>
        </Row>

        <Alert variant="warning" className="mt-3">
          <strong>📱 Instrucciones para Yappy:</strong>
          <ol className="mb-0 mt-2">
            <li>Abre tu app de Yappy</li>
            <li>Selecciona "Enviar Dinero"</li>
            <li>Ingresa el número: <strong>6123-4567</strong></li>
            <li>Envía el monto exacto: <strong>{formatearPrecio(calcularTotal(total))}</strong></li>
            <li>En el concepto escribe tu nombre completo</li>
            <li>Envía captura de pantalla por WhatsApp al: <strong>6123-4567</strong></li>
          </ol>
        </Alert>
      </Card.Body>
    </Card>
  );

  return (
    <div className="mt-4">
      {metodoPago === 'transferencia' && renderTransferencia()}
      {metodoPago === 'yappy' && renderYappy()}
    </div>
  );
}
