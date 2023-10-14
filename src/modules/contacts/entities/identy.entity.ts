import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Contact } from './contact.entity';

@Entity('identities')
export class Identity {
  @PrimaryGeneratedColumn('uuid')
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
