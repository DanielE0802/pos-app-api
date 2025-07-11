import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Contact } from './contact.entity';

@Entity('contact_identities')
export class ContactIdentity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'type_document' })
  typeDocument: number;

  @Column({ name: 'type_person' })
  typePerson: number;

  @Column()
  number: number;

  @Column()
  dv: number;

  @OneToOne(() => Contact, (contact) => contact.identity)
  contact: Contact;
}
