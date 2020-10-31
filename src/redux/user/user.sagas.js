import { takeLatest, put, all, call } from "redux-saga/effects";
import userActions from "./user-constants";

import {
  auth,
  googleProvider,
  createUserProfileDocument,
} from "../../firebase/firebase.utils";

import { signInSuccess, signInFailure } from "./user-action";

export function* getSnapshotFromuser(userAuth) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth);
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapshotFromuser(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}
export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromuser(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}
export function* onGoogleSigninStart() {
  yield takeLatest(userActions.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSigninStart() {
  yield takeLatest(userActions.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* userSagas() {
  yield all([call(onGoogleSigninStart), call(onEmailSigninStart)]);
}