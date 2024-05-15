export class TicketComment {
  constructor(
    public id?: number,
    public ticketId?: number,
    public userId?: number,
    public comment?: string,
    public commentDate?: number,
    public edited?: boolean
  ) {

  }

}
