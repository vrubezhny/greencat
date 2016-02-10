package org.GreenCat.logic;

import java.util.ArrayList;

import org.junit.Assert;
import org.junit.Test;


public class WordStatisticsTest {

	@Test
	public void testGetWordCounts() throws Exception {
		Stats stats = WordStatistics.getWordCounts("a nice word word", new ArrayList<>());
		Assert.assertEquals(Integer.valueOf(4), stats.numberofWordsOnPage);
		Assert.assertEquals(Integer.valueOf(2), stats.wordCounts.get("word"));
		
	}

}
