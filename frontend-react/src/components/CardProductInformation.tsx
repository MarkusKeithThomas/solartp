import { Row, Col, Accordion } from "react-bootstrap";


type SpecificationItem = {
  name: string;
  value: string;
  displayOrder: number;
};

type SpecificationGroups = {
  [group: string]: SpecificationItem[] | undefined;
};
type Props = {
  specificationGroups?: SpecificationGroups;
};

export function CardProductInformation({specificationGroups}:Props) {

  return (
    <>
      <Accordion alwaysOpen className="mt-4"> {/* Giữ nguyên khi mở */}
        
        {/* Thông số đèn */}
        {Object.entries(specificationGroups ?? {}).map(([groupName, specs]) => (
          <Accordion.Item eventKey={groupName} key={groupName}>
            <Accordion.Header>{groupName}</Accordion.Header>
            <Accordion.Body>
              {specs?.sort((a, b) => a.displayOrder - b.displayOrder)
                .map((spec) => (
                  <Row className="bg-light p-2" key={spec.displayOrder}>
                    <Col md={6}><strong>{spec.name}:</strong></Col>
                    <Col md={6}>{spec.value}</Col>
                  </Row>
                ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      </>
      
  );
}