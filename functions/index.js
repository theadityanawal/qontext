const { setGlobalOptions } = require('firebase-functions/v2');
const { onRequest } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');

admin.initializeApp();

// Set global options
setGlobalOptions({
  maxInstances: 10,
  timeoutSeconds: 540,
  memory: '256MiB',
});

exports.handleGoogleAuth = onRequest(async (req, res) => {
  try {
    const user = req.body;

    // Check if user document exists
    const userDoc = await admin.firestore()
      .collection('users')
      .doc(user.uid)
      .get();

    if (!userDoc.exists()) {
      // Create new user document if it doesn't exist
      await admin.firestore()
        .collection('users')
        .doc(user.uid)
        .set({
          uid: user.uid,
          email: user.email,
          created_at: admin.firestore.Timestamp.now(),
          last_login: admin.firestore.Timestamp.now(),
          parent_resume_id: null,
          displayName: user.displayName || null,
          photoURL: user.photoURL || null
        });
    } else {
      // Update last login if user exists
      await admin.firestore()
        .collection('users')
        .doc(user.uid)
        .update({
          last_login: admin.firestore.Timestamp.now()
        });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error handling Google auth:', error);
    res.status(500).json({ error: 'Failed to handle authentication' });
  }
});
