import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  provider: {
    type: String,
    required: true
  },
  sub: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  name: {
    givenName: {
      type: String
    },
    familyName: {
      type: String
    }
  },
  given_name: {
    type: String
  },
  family_name: {
    type: String
  },
  email_verified: {
    type: Boolean
  },
  verified: {
    type: Boolean,
    default: false
  },
  language: {
    type: String,
    default: 'en'
  },
  email: {
    type: String,
    required: true
  },
  emails: [{
    value: {
      type: String
    },
    type: {
      type: String,
      default: 'account'
    }
  }],
  photos: [{
    value: {
      type: String
    },
    type: {
      type: String,
      default: 'default'
    }
  }],
  picture: {
    type: String
  },
  _raw: {
    type: String
  },
  _json: {
    sub: {
      type: String
    },
    name: {
      type: String
    },
    given_name: {
      type: String
    },
    family_name: {
      type: String
    },
    picture: {
      type: String
    },
    email: {
      type: String
    },
    email_verified: {
      type: Boolean
    },
    locale: {
      type: String,
      default: 'en'
    }
  }
});

const User = mongoose.model('User', UserSchema);

export default User;
