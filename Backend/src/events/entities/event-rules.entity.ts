import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { Events } from './event.entity';

@Entity('EventRules')
@Unique(['event', 'ruleNo'])
@Unique(['event', 'eventRule'])
export class EventRules {
  @PrimaryGeneratedColumn('uuid')
  eventRulesId: string;

  @Column()
  eventRule: string;

  @Column()
  ruleNo: number;

  @ManyToOne(() => Events, (event) => event.eventRules, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'eventId' })
  event: Events;
}
