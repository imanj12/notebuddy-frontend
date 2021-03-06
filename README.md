## Overview

Scribe (formerly NoteBuddy) uses a React frontend and a Rails [backend](https://github.com/imanj12/notebuddy-backend).

Users can create a new note, edit, and tag the note. Note editing is done using a rich text editor. Scribe supports searching and viewing notes by tag.

## New User Quick Start Guide

### Create Account

1. Visit [Scribe](https://notebuddy-frontend.herokuapp.com)
2. Create a username
3. Enter a password at least 6 characters in length
4. After selecting "Sign-Up", user will be taken to the primary app interface

### Main Interface

The main interface consists of three elements.

1. A left-side navigation bar with a new note button, an all notes button, and a tags button.
2. A list of notes that defaults to displaying all your notes by order of last updated. To display notes by tag, select the Tags button in the left-side navigation bar.

### Create New Note

Create a new note by selecting "New" on the left side navbar and entering a title for the note

### Edit a Note

Select the new note from the list to open the rich text editor and edit the note

### Save or Delete Note

Save or delete the note using the icons to the right of the note title edit box. Users are made aware of the current saved/unsaved status of their note with a notification to the right of the delete button.

### Tagging

Begin typing in the Tag input box to search by existing tags. Select a tag using the arrow keys or mouse, and press enter to select the tag. Alternatively, you can simply press enter without selecting an existing tag to create a new tag. Save the note to persist tags.

### Search by Tag

You can view tags by selecting the Tags button on the left-side navigation bar. To filter the notes list by a certain tag, simply select the tag. You can search for tags from within this popup as well.
