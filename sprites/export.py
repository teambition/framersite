#!/bin/env python

import os
import sys
import shutil

path = os.path.dirname(__file__)
export_path = os.path.join(path, "export")
export_path_1x = os.path.join(path, "sprite1x")
export_path_2x = os.path.join(path, "sprite2x")

for file_name in os.listdir(export_path):

	if not file_name.endswith(".png"):
		continue

	if "@2x" in file_name:
		shutil.copyfile(os.path.join(export_path, file_name), os.path.join(export_path_2x, file_name.replace("@2x", "")))
	else:
		shutil.copyfile(os.path.join(export_path, file_name), os.path.join(export_path_1x, file_name))