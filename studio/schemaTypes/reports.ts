export default {
  name: 'report',
  title: 'Report',
  type: 'document',
  fields: [
    // Reports' title
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    // Reports author(s)
    {
      name: 'author',
      title: 'Author',
      type: 'string',
    },
    //A link for the report
    {
      name: 'content',
      title: 'Content',
      type: 'url',
      description: 'Provide a URL for this report.',
    },
    // The abstract of the report, prompts user for a summary
    {
      name: 'abstract',
      title: 'Abstract',
      type: 'text',
      description: 'Provide a brief summary of the report.',
    },
    // The suggested citation for the report
    {
      name: 'citation',
      title: 'Citation',
      type: 'text',
      description: 'Enter the suggested citation for this report',
    },
    // The date the report was published selected by the user
    {
      name: 'date',
      title: 'Date',
      type: 'datetime',
    },
    // A set of tags for selecting what type of report it is
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Resident', value: 'resident' },
              { title: 'Nonresident', value: 'nonresident' },
              { title: 'Population', value: 'population' },
              { title: 'Economics', value: 'economics' },
              { title: 'Outdoor Recreation', value: 'outdoorrec' },
              { title: 'Community', value: 'community' },
              { title: 'TAC', value: 'tac' },
              { title: 'Survey', value: 'survey' },
            ],
          },
        },
      ],
    },
  ],
}
