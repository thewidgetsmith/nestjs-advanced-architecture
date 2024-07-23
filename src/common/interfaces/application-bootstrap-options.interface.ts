export interface ApplicationBootstrapOptions {
  eventStore: 'mongodb' | 'in-memory';
  driver: 'orm' | 'in-memory';
}
